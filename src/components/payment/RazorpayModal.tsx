import React, { useState } from 'react';
import { Shield, CheckCircle2, Lock, X, ArrowRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

// Minimal shape of the window.Razorpay constructor injected by the
// checkout.js script -- just enough to type-check what we actually use.
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number; // in rupees -- used for display, and as a fallback if the server can't verify the price itself (see itemType/itemId)
  itemDescription?: string;
  /** Unique-ish id for this purchase attempt, used as the order receipt. */
  receiptId?: string;
  /** 'course' items get their price re-verified server-side against Firestore -- always pass this + itemId for courses. */
  itemType?: 'course' | 'mentorship' | 'strategy_session';
  itemId?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (paymentId: string) => void;
}

let razorpayScriptPromise: Promise<void> | null = null;

/** Loads the Razorpay Checkout script once and reuses the same promise on re-renders. */
function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout script.'));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  title,
  amount,
  itemDescription,
  receiptId,
  itemType,
  itemId,
  prefill,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedPayId, setGeneratedPayId] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    if (isProcessing) return;
    setErrorMsg('');
    onClose();
  };

  const handlePayNow = async () => {
    setErrorMsg('');
    setIsProcessing(true);

    try {
      await loadRazorpayScript();

      // Order creation happens on our server, not here -- the Razorpay key
      // *secret* has to stay server-side, so the browser only ever asks our
      // backend "please create an order for this amount" and gets back an
      // order id + the public key id to check out with.
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: receiptId || `receipt_${Date.now()}`,
          notes: { title },
          itemType,
          itemId,
        }),
      });

      if (!orderRes.ok) {
        const body = await orderRes.json().catch(() => ({}));
        throw new Error(body.error || 'Could not start payment. Please try again.');
      }

      const order = await orderRes.json();

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Sneha Gupta (CA Finalist)',
        description: itemDescription || title,
        order_id: order.orderId,
        prefill: {
          name: prefill?.name,
          email: prefill?.email,
          contact: prefill?.contact,
        },
        theme: { color: '#2563EB' },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyBody = await verifyRes.json().catch(() => ({}));

            if (!verifyRes.ok || !verifyBody.verified) {
              setIsProcessing(false);
              setErrorMsg(
                'We could not verify this payment. If money was deducted, it will be auto-refunded -- please contact support with your payment ID.'
              );
              return;
            }

            setGeneratedPayId(response.razorpay_payment_id);
            setIsProcessing(false);
            setIsSuccess(true);

            try {
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981', '#F59E0B'],
              });
            } catch {
              // confetti is cosmetic only -- never let it block the success flow
            }

            setTimeout(() => {
              onSuccess(response.razorpay_payment_id);
            }, 1200);
          } catch (err) {
            setIsProcessing(false);
            setErrorMsg('Payment verification failed. Please contact support before retrying.');
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      });

      razorpay.on('payment.failed', () => {
        setIsProcessing(false);
        setErrorMsg('Payment failed or was declined. Please try again.');
      });

      razorpay.open();
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMsg(err?.message || 'Something went wrong starting the payment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden relative">
        {/* Top Header - Razorpay Style */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-lg border border-white/20">
              SG
            </div>
            <div>
              <p className="text-xs text-blue-100 font-medium tracking-wide uppercase">Secured by Razorpay</p>
              <h3 className="font-semibold text-base leading-tight">Sneha Gupta (CA Finalist)</h3>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            disabled={isProcessing}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Order Description</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[260px]">{title}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Amount</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{amount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Successful!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your transaction has been verified. Redirecting you to your unlocked dashboard...
            </p>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Payment ID: <span className="font-semibold text-blue-600">{generatedPayId}</span>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="p-10 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
              <Shield className="w-6 h-6 text-blue-600 absolute inset-0 m-auto" />
            </div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-lg">Contacting Payment Gateway...</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete your payment in the Razorpay window. Please do not refresh or close this page.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {errorMsg && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl text-xs text-red-700 dark:text-red-300">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <p className="text-sm text-slate-600 dark:text-slate-300">
              You'll be redirected to Razorpay's secure checkout to pay via UPI, card, netbanking, or wallet.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handlePayNow}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition active:scale-[0.99]"
            >
              <span>Pay ₹{amount.toLocaleString('en-IN')} Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Footer Trust Shield */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>256-bit SSL Encrypted &bull; Instant Access Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};