// Vercel serverless function: POST /api/create-order
//
// Creates a Razorpay order before checkout opens. Uses RAZORPAY_KEY_SECRET,
// which is why this must run server-side (set in Vercel Project Settings
// -> Environment Variables, never shipped to the browser).
//
// The amount is never trusted from the request body -- it's always looked
// up server-side via resolveTrustedAmount, so a modified request can't buy
// anything for less than its real price.

import { resolveTrustedAmount } from './_lib/firebase.js';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.status(500).json({
      error: 'Razorpay is not configured on the server. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel env vars.',
    });
  }

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

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID, // public key id -- safe to send to the client
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: 'Could not reach Razorpay. Please try again.' });
  }
}