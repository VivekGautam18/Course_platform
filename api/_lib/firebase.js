// Shared Firebase Admin initialization for Vercel serverless functions.
//
// Both api/create-order.js and api/verify.js need server-side Firestore
// access, so the init logic lives here once instead of being duplicated.
//
// Vercel keeps a function "warm" between requests, so we guard against
// calling admin.initializeApp() more than once on the same warm instance.

import admin from 'firebase-admin';

let firestore = null;
let initError = null;

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
      );
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
      firestore = admin.firestore();
    } else {
      initError =
        'FIREBASE_SERVICE_ACCOUNT_BASE64 is not set -- server-side price verification is DISABLED.';
      console.warn('⚠️  ' + initError);
    }
  } catch (error) {
    initError = 'Failed to initialize Firebase Admin -- price verification disabled: ' + error.message;
    console.error(initError);
  }
} else {
  // Already initialized on this warm instance.
  firestore = admin.firestore();
}

/**
 * Figures out the amount we should actually charge, in rupees. We never
 * trust the amount the browser sends -- we always look the real price up
 * ourselves in Firestore. This is what stops a modified request from
 * buying anything for ₹1.
 */
export async function resolveTrustedAmount({ itemType, itemId }) {
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