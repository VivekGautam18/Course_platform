import React, { useState } from 'react';
import { X, Calendar, Calculator, CheckCircle2, BookOpen, Clock, Download, ArrowRight, Sparkles } from 'lucide-react';

interface StudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyPlannerModal: React.FC<StudyPlannerModalProps> = ({ isOpen, onClose }) => {
  const [examAttempt, setExamAttempt] = useState('CA Inter Sept 2026');
  const [groupChoice, setGroupChoice] = useState<'both' | 'single'>('both');
  const [dailyHours, setDailyHours] = useState(8);
  const [revisionCycles, setRevisionCycles] = useState(3);
  const [generatedPlan, setGeneratedPlan] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded text-white">
              Automated CA Timetable Engine
            </span>
          </div>
          <h3 className="text-xl font-bold mt-2">Sneha Gupta Smart Study Planner</h3>
          <p className="text-xs text-blue-100 mt-1">
            Calculate exact subject-wise hour allocations & 3-layer revision cycles
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Target Attempt
              </label>
              <select
                value={examAttempt}
                onChange={(e) => setExamAttempt(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl outline-none dark:bg-slate-800 dark:text-white"
              >
                <option value="CA Inter Sept 2026">CA Inter Sept 2026 (Approx 45 Days Remaining)</option>
                <option value="CA Inter Jan 2027">CA Inter Jan 2027 (Approx 160 Days Remaining)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Group Strategy
              </label>
              <select
                value={groupChoice}
                onChange={(e) => setGroupChoice(e.target.value as 'both' | 'single')}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl outline-none dark:bg-slate-800 dark:text-white"
              >
                <option value="both">Both Groups (6 Subjects)</option>
                <option value="single">Single Group (3 Subjects)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Daily Available Study Hours ({dailyHours} Hours/Day)
              </label>
              <input
                type="range"
                min={4}
                max={14}
                step={1}
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Target Revision Cycles
              </label>
              <select
                value={revisionCycles}
                onChange={(e) => setRevisionCycles(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl outline-none dark:bg-slate-800 dark:text-white"
              >
                <option value={2}>2 Cycles (Standard)</option>
                <option value={3}>3 Cycles (Recommended by Sneha Gupta)</option>
                <option value={4}>4 Cycles (High-Ranker Strategy)</option>
              </select>
            </div>
          </div>

          {!generatedPlan ? (
            <button
              onClick={() => setGeneratedPlan(true)}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Timetable & Daily Schedule</span>
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300 border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Recommended Blueprint for {examAttempt}
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  {dailyHours * (groupChoice === 'both' ? 45 : 30)} Total Study Hours
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900 text-xs space-y-1">
                  <p className="font-bold text-blue-900 dark:text-blue-300">Phase 1: First Pass (60%)</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {groupChoice === 'both' ? '25 Days • 5 Hours/Subject' : '18 Days • 8 Hours/Subject'}
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
                  <p className="font-bold text-indigo-900 dark:text-indigo-300">Phase 2: First Revision (25%)</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {groupChoice === 'both' ? '12 Days • Active Recall + RTP' : '8 Days • RTP & Past 5 Attempts'}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-100 dark:border-purple-900 text-xs space-y-1">
                  <p className="font-bold text-purple-900 dark:text-purple-300">Phase 3: 1.5 Days Simulation</p>
                  <p className="text-slate-600 dark:text-slate-400">Final 8 Days • Timed Mock Tests & SAs</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Daily Routine Breakdown ({dailyHours} Hours):</p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Slot 1 (3 Hours): Practical Subject (Taxation / Costing) - High alertness morning</li>
                  <li>Slot 2 (3 Hours): Theory Subject (Audit / Law / FM-SM) - Memory & Section mnemonics</li>
                  <li>Slot 3 (2 Hours): RTP Question Bank & Error Log revision</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
