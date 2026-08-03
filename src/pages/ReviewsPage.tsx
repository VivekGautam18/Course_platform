import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Star, Plus, ShieldCheck, Image, CheckCircle } from 'lucide-react';
import { AddReviewModal } from '../components/reviews/AddReviewModal';

export const ReviewsPage: React.FC = () => {
  const { testimonials } = useData();
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
            Wall of Success
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Student Reviews & WhatsApp Feedback
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Read verified reviews and marksheets from CA Inter & Final aspirants mentored by Sneha Gupta.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Review</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition space-y-4 text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.studentName}</h4>
                    <p className="text-xs text-slate-500">{t.studentAttempt}</p>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {t.examScore && (
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.examScore}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.reviewText}"
              </p>

              {t.whatsappScreenshotUrl && (
                <button
                  onClick={() => setActiveImage(t.whatsappScreenshotUrl || null)}
                  className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 relative group"
                >
                  <img
                    src={t.whatsappScreenshotUrl}
                    alt="WhatsApp Feedback Screenshot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                    Click to View Screenshot
                  </div>
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>{t.date}</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">Verified Aspirant</span>
            </div>
          </div>
        ))}
      </div>

      {/* Screenshot Modal Lightbox */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={activeImage}
            alt="Full WhatsApp Screenshot"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <AddReviewModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
