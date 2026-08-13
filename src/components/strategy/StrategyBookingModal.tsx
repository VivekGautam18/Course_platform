import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RazorpayModal } from '../payment/RazorpayModal';
import {
  X,
  Calendar,
  Clock,
  Phone,
  User,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Video,
  FileCheck,
  Zap,
} from 'lucide-react';

interface StrategyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyBookingModal: React.FC<StrategyBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { bookStrategySession, strategySessionPrice } = useData();

  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [contactNumber, setContactNumber] = useState(user?.phone || '');
  const [attempt, setAttempt] = useState('CA Inter Sept 2026');
  const [date, setDate] = useState('2026-08-08');
  const [timeSlot, setTimeSlot] = useState('04:00 PM - 04:45 PM');
  const [primaryStruggle, setPrimaryStruggle] = useState(
    'Balancing theory retention with practical numerical speed in Costing/Taxation'
  );

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    bookStrategySession({
      studentName,
      studentEmail,
      contactNumber,
      attempt,
      date,
      timeSlot,
      primaryStruggle,
      amountPaid: strategySessionPrice,
      paymentId,
    });
    setShowRazorpay(false);
    setIsBooked(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md">
                1:1 Live Strategy Call
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">₹{strategySessionPrice}</span>
            </div>
            <h3 className="text-xl font-bold mt-2">Book 1:1 Strategy Session with Sneha Gupta</h3>
            <p className="text-xs text-blue-100 mt-1">
              45-Minute Personalized Blueprint • Subject-wise Backlog Recovery • Revision Schedule
            </p>
          </div>

          {isBooked ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Strategy Session Booked!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your 1:1 session with Sneha Gupta (CA Finalist) is confirmed for{' '}
                <strong className="text-blue-600">{date}</strong> at <strong className="text-blue-600">{timeSlot}</strong>.
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Google Meet Link: https://meet.google.com/sg-strategy-session</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Duration: 45 Minutes • Calendar invite sent to {studentEmail}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
              >
                Close • Go to My Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-left">
              {/* Features summary bar */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Custom Study Planner</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Subject-wise Planning</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Backlog Recovery</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Remaining Days Action Plan</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Select Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    >
                      <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                      <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                      <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                      <option value="08:00 PM - 08:45 PM">08:00 PM - 08:45 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Primary Struggle / Focus Area *
                  </label>
                  <textarea
                    rows={2}
                    value={primaryStruggle}
                    onChange={(e) => setPrimaryStruggle(e.target.value)}
                    placeholder="Describe your current backlogs, fear subjects, or revision struggles..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
                >
                  <Zap className="w-4 h-4" />
                  <span>Book Strategy Call Now (₹{strategySessionPrice})</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <RazorpayModal
        isOpen={showRazorpay}
        onClose={() => setShowRazorpay(false)}
        title="1:1 Strategy Session with Sneha Gupta"
        amount={strategySessionPrice}
        itemType="strategy_session"
        itemId="strategySession"
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};