import React from 'react';
import { Zap, Calendar, Clock, CheckCircle2, ShieldCheck, UserCheck, Video, FileText } from 'lucide-react';

interface StrategyPageProps {
  onOpenBookingModal: () => void;
}

export const StrategyPage: React.FC<StrategyPageProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-white text-left space-y-6 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-slate-950" />
          <span>Exclusive 1:1 Live Strategy Call • ₹799</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black leading-tight">
          Personal Strategy & Backlog Recovery Call
        </h1>

        <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
          45 minutes of direct 1:1 consultation with Sneha Gupta (CA Finalist). We review your current preparation level, calculate subject-wise remaining hours, and build a personalized revision schedule.
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenBookingModal}
            className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm rounded-2xl shadow-xl transition active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Book Your Slot Now (₹799)</span>
          </button>
        </div>
      </div>

      {/* What You Get Breakdown */}
      <div className="space-y-6 text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Included in Your ₹799 Call</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">45-Min 1:1 Live Call</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Private Google Meet call with Sneha Gupta focusing purely on your specific struggles and subject fears.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Personalized Study Planner</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Custom PDF timetable generated live based on your daily available hours and remaining exam days.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Backlog Recovery Plan</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step priority queue to eliminate pending lectures without sacrificing ongoing revision cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
