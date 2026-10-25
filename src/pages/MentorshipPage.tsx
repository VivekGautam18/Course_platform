import React, { useState } from 'react';
import { MentorshipOption } from '../types';
import { useData } from '../context/DataContext';
import { CheckCircle2, GraduationCap, Calendar, Clock, MessageSquare, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface MentorshipPageProps {
  onOpenMentorshipModal: (mentorship: MentorshipOption) => void;
}

export const MentorshipPage: React.FC<MentorshipPageProps> = ({ onOpenMentorshipModal }) => {
  const { mentorships, isMentorshipPurchased } = useData();
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const filteredMentorships = mentorships.filter(
    (m) => selectedExam === 'all' || m.examTerm === selectedExam
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 text-xs font-bold rounded-full w-fit mx-auto">
          <span className="flex h-2 w-2 rounded-full bg-[#2563EB]" />
          <span>Personal Guidance Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Sneha Gupta Mentorship
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Transform your exam preparation with customized weekly targets, 24/7 direct WhatsApp access, and 1:1 strategy calls.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2">
        <button
          onClick={() => setSelectedExam('all')}
          className={`px-5 py-2 text-xs font-semibold rounded-full transition ${
            selectedExam === 'all'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          All Programs
        </button>
        <button
          onClick={() => setSelectedExam('CA Foundation Jan 2027')}
          className={`px-5 py-2 text-xs font-semibold rounded-full transition ${
            selectedExam === 'CA Foundation Jan 2027'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          CA Foundation Jan 2027
        </button>
        <button
          onClick={() => setSelectedExam('CA Inter Jan 2027')}
          className={`px-5 py-2 text-xs font-semibold rounded-full transition ${
            selectedExam === 'CA Inter Jan 2027'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          CA Inter Jan 2027
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMentorships.map((m) => {
          const purchased = isMentorshipPurchased(m.id);
          return (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg">
                    {m.examTerm}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      ₹{m.price.toLocaleString('en-IN')}
                    </span>
                    {m.originalPrice && m.originalPrice > m.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">₹{m.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{m.title ?? m.groupType}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Mentorship Benefits
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {m.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {m.validity && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white">Validity:</strong> {m.validity}
                  </p>
                )}

                {m.customPlan ? (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      {m.customPlan.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {m.customPlan.before}
                      <strong className="text-slate-900 dark:text-white">{m.customPlan.bold}</strong>
                      {m.customPlan.after}
                    </p>
                  </div>
                ) : m.weeklyPlan.length > 0 ? (
                  <>
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Structured Weekly Blueprint
                  </p>
                  <div className="space-y-2 text-xs">
                    {m.weeklyPlan.map((wp, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/60"
                      >
                        <p className="font-bold text-blue-600 dark:text-blue-400">{wp.week}: {wp.topic}</p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{wp.goal}</p>
                      </div>
                    ))}
                  </div>
                </div>
                  </>
                ) : null}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => onOpenMentorshipModal(m)}
                  className={`w-full py-3.5 font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 ${
                    purchased
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                  }`}
                >
                  <span>{purchased ? 'Active Program • View Info Form' : `Enroll Now (₹${m.price})`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
