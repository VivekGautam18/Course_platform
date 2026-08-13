import React, { useState } from 'react';
import { MentorshipOption } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RazorpayModal } from '../payment/RazorpayModal';
import { X, CheckCircle, ShieldCheck, User, Mail, Phone, GraduationCap, Award, ArrowRight } from 'lucide-react';

interface MentorshipFormModalProps {
  mentorship: MentorshipOption | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MentorshipFormModal: React.FC<MentorshipFormModalProps> = ({
  mentorship,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { enrollMentorship } = useData();

  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.phone || '');
  const [attempt, setAttempt] = useState<string>(mentorship?.examTerm || 'CA Inter Sept 2026');
  const [college, setCollege] = useState(user?.college || '');
  const [prepLevel, setPrepLevel] = useState(user?.preparationLevel || '50% Syllabus Completed');

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !mentorship) return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    enrollMentorship(mentorship.id, {
      studentName,
      studentEmail,
      mobile,
      attempt,
      college,
      currentPreparationLevel: prepLevel,
      amountPaid: mentorship.price,
      paymentId,
    });
    setShowRazorpay(false);
    setSubmitted(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md text-white backdrop-blur-md">
              Mentorship Enrollment Form
            </span>
            <h3 className="text-xl font-bold mt-2">{mentorship.examTerm}</h3>
            <p className="text-xs text-blue-100 mt-1">
              {mentorship.groupType} • Fee: ₹{mentorship.price.toLocaleString('en-IN')}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enrollment Confirmed!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your profile has been shared with Sneha Gupta (CA Finalist). Expect a direct WhatsApp message with your personalized timetable within 12 hours.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Done • View Student Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 text-left">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="aarav@gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Attempt
                    </label>
                    <select
                      value={attempt}
                      onChange={(e) => setAttempt(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                    >
                      <option value="CA Inter Sept 2026">CA Inter Sept 2026</option>
                      <option value="CA Inter Jan 2027">CA Inter Jan 2027</option>
                      <option value="CA Inter May 2027">CA Inter May 2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      College / Coaching
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. St. Xaviers / Self Study"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Preparation Level *
                  </label>
                  <select
                    value={prepLevel}
                    onChange={(e) => setPrepLevel(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Just Starting (0-25%)">Just Starting (0-25% Done)</option>
                    <option value="50% Preparation Done">50% Preparation Done</option>
                    <option value="Revision & Test Series Stage">Revision & Test Series Stage</option>
                    <option value="Repeat Attempt (Need Rank Strategy)">Repeat Attempt (Need Rank Strategy)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
                >
                  <span>Proceed to Payment (₹{mentorship.price.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <RazorpayModal
        isOpen={showRazorpay}
        onClose={() => setShowRazorpay(false)}
        title={`${mentorship.examTerm} - ${mentorship.groupType} Mentorship`}
        amount={mentorship.price}
        itemType="mentorship"
        itemId={mentorship.id}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};