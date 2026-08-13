// Minimal backend for Razorpay.
//
// Why this file exists at all: Razorpay payments need two things that must
// never happen in the browser bundle --
//   1. Creating an "order" before checkout opens (uses your secret key)
//   2. Verifying the payment signature after checkout closes (also needs
//      the secret key, via HMAC-SHA256)
// Both live here, server-side. The React app only ever talks to these two
// routes -- it never sees RAZORPAY_KEY_SECRET.
//
// It ALSO re-checks the price server-side for every purchase type (course,
// mentorship, strategy session) via resolveTrustedAmount below. Without
// this, a browser could be made to send any amount it likes to
// /create-order -- the payment would still go through genuinely, just for
// less money than the item actually costs.
//
// Dev:  `npm run server` (runs this on PORT, default 8787) alongside
//       `npm run dev` (Vite dev server, proxies /api/* to this server --
//       see vite.config.ts).
// Prod: `npm run build` then `npm start` -- this same server also serves
//       the built dist/ folder, so one process handles both the site and
//       the API.

import express from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8787;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// --- Firebase Admin (server-side Firestore access) ---
// Needed so we can look up a course's REAL price ourselves instead of
// trusting whatever amount the browser sends us. See README / chat
// instructions for how to generate this service account key.
let firestore = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
    );
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    firestore = admin.firestore();
  } else {
    console.warn(
      '⚠️  FIREBASE_SERVICE_ACCOUNT_BASE64 is not set -- server-side price verification for courses is DISABLED. See setup instructions.'
    );
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin -- price verification disabled:', error);
}

function requireRazorpayConfig(res) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    res.status(500).json({
      error:
        'Razorpay is not configured on the server. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file.',
    });
    return false;
  }
  return true;
}

/**
 * Figures out the amount we should actually charge, in rupees. We never
 * trust the amount the browser sends -- we always look the real price up
 * ourselves in Firestore. This is what stops a modified request from
 * buying anything for ₹1.
 */
async function resolveTrustedAmount({ itemType, itemId }) {
  if (!firestore) {
    throw new Error(
      'Server-side price verification is not configured (FIREBASE_SERVICE_ACCOUNT_BASE64 missing). Payments are disabled until this is set up.'
    );
  }

  if (itemType === 'course') {
    if (!itemId) throw new Error('Missing course id.');
    const courseDoc = await firestore.collection('courses').doc(itemId).get();
    if (!courseDoc.exists) throw new Error('Course not found.');
    const price = Number(courseDoc.data().price);
    if (!price || price <= 0) throw new Error('This course does not have a valid price set.');
    return price;
  }

  if (itemType === 'mentorship') {
    if (!itemId) throw new Error('Missing mentorship id.');
    const mentorshipDoc = await firestore.collection('mentorships').doc(itemId).get();
    if (!mentorshipDoc.exists) throw new Error('Mentorship program not found.');
    const price = Number(mentorshipDoc.data().price);
    if (!price || price <= 0) throw new Error('This mentorship program does not have a valid price set.');
    return price;
  }

  if (itemType === 'strategy_session') {
    const settingsDoc = await firestore.collection('settings').doc('strategySession').get();
    const price = Number(settingsDoc.exists ? settingsDoc.data().price : 799);
    if (!price || price <= 0) throw new Error('The strategy session does not have a valid price set.');
    return price;
  }

  throw new Error('Unknown item type.');
}

/**
 * Create a Razorpay order. The frontend calls this before opening checkout.
 * Amount is resolved server-side (see resolveTrustedAmount) wherever
 * possible, rather than trusted directly from the request body.
 */
app.post('/api/create-order', async (req, res) => {
  if (!requireRazorpayConfig(res)) return;

  const { receipt, notes, itemType, itemId } = req.body || {};

  let amountInRupees;
  try {
    amountInRupees = await resolveTrustedAmount({ itemType, itemId });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: Math.round(amountInRupees * 100), // paise
        currency: 'INR',
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Razorpay order creation failed:', order);
      return res.status(502).json({ error: order?.error?.description || 'Razorpay rejected the order request.' });
    }

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID, // public key id -- safe to send to the client
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Could not reach Razorpay. Please try again.' });
  }
});

/**
 * Verify a completed payment's signature. This is the step that actually
 * proves the payment is genuine and wasn't forged/replayed from the
 * browser -- the frontend must NOT grant access until this returns
 * { verified: true }.
 */

app.post('/api/verify', (req, res) => {
  if (!requireRazorpayConfig(res)) return;

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ verified: false, error: 'Missing payment fields.' });
  }

  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const verified = expectedSignature === razorpay_signature;

  if (!verified) {
    console.warn('Razorpay signature mismatch for order', razorpay_order_id);
  }

  res.json({ verified });
});

// --- Serve the built frontend in production ---
// (No-op during `npm run dev`, since Vite serves the app itself there.)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Razorpay API server listening on http://localhost:${PORT}`);
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.warn('⚠️  RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set -- payments will fail until you add them to .env');
  }
  if (!firestore) {
    console.warn('⚠️  FIREBASE_SERVICE_ACCOUNT_BASE64 is not set -- ALL payments (course, mentorship, strategy session) will fail until this is set, since prices are now always verified against Firestore.');
  }
});