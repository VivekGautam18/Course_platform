// Vercel serverless function: POST /api/verify
//
// Verifies a completed payment's HMAC-SHA256 signature. This is the step
// that actually proves the payment is genuine and wasn't forged/replayed
// from the browser -- the frontend must NOT grant access until this
// returns { verified: true }.

import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!RAZORPAY_KEY_SECRET) {
    return res.status(500).json({
      error: 'Razorpay is not configured on the server. Add RAZORPAY_KEY_SECRET in Vercel env vars.',
    });
  }

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

  return res.status(200).json({ verified });
}