import React, { useState } from 'react';
import { Shield, CheckCircle2, QrCode, CreditCard, Building, Smartphone, Lock, X, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  itemDescription?: string;
  onSuccess: (paymentId: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  title,
  amount,
  itemDescription,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'qr' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPayId, setGeneratedPayId] = useState('');

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);
    const payId = `pay_RZP_${Math.floor(100000000 + Math.random() * 900000000)}`;
    setGeneratedPayId(payId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.log('Confetti effect fired', err);
      }

      setTimeout(() => {
        onSuccess(payId);
      }, 1500);
    }, 1800);
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
            onClick={onClose}
            disabled={isProcessing}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
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
              Transaction ID: <span className="font-semibold text-blue-600">{generatedPayId}</span>
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
              Please do not refresh or close this window. Verifying instant response with Razorpay.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`py-2 text-xs font-semibold rounded-lg transition flex flex-col items-center gap-1 ${
                  selectedMethod === 'upi'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                UPI / GPay
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('qr')}
                className={`py-2 text-xs font-semibold rounded-lg transition flex flex-col items-center gap-1 ${
                  selectedMethod === 'qr'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-4 h-4" />
                Scan QR
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`py-2 text-xs font-semibold rounded-lg transition flex flex-col items-center gap-1 ${
                  selectedMethod === 'card'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('netbanking')}
                className={`py-2 text-xs font-semibold rounded-lg transition flex flex-col items-center gap-1 ${
                  selectedMethod === 'netbanking'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Building className="w-4 h-4" />
                Banking
              </button>
            </div>

            {/* Tab Specific Content */}
            {selectedMethod === 'upi' && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Enter VPA / UPI ID or select instant app:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUpiId('student@okicici')}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1"
                  >
                    Google Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiId('student@ybl')}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1"
                  >
                    PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiId('student@paytm')}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1"
                  >
                    Paytm
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g. mobileNumber@upi / username@okicici"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            {selectedMethod === 'qr' && (
              <div className="text-center py-2 space-y-2">
                <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-800 inline-block shadow-inner">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=snehagupta@razorpay&pn=SnehaGuptaCA&am=799"
                    alt="Razorpay UPI QR"
                    className="w-36 h-36 mx-auto"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Scan with any UPI App (GPay, PhonePe, Paytm) to pay ₹{amount}
                </p>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8910"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="08/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">CVC</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Select Popular Bank:</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Bank of Baroda'].map(
                    (bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={handlePayNow}
                        className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50/40 text-slate-700 dark:text-slate-300 text-left transition"
                      >
                        {bank}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

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
              <span>256-bit SSL Encrypted • Instant Access Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
