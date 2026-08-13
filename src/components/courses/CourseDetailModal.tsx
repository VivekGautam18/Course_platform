import React, { useState } from 'react';
import { Course, Video, PDFResource } from '../../types';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  PlayCircle,
  FileText,
  Clock,
  Star,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Download,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { RazorpayModal } from '../payment/RazorpayModal';
import { PdfViewerModal } from './PdfViewerModal';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenVideoPlayer?: (courseId: string, videoId: string) => void;
  /** Called when a signed-out visitor tries to buy — should open the login modal. */
  onRequireAuth?: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onOpenVideoPlayer,
  onRequireAuth,
}) => {
  const { isCoursePurchased, unlockCourse } = useData();
  const { isAuthenticated, user } = useAuth();
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<PDFResource | null>(null);

  if (!isOpen || !course) return null;

  const purchased = isCoursePurchased(course.id);

  const handleBuyClick = () => {
    // Students must be logged in before checkout opens — unlockCourse writes
    // the purchase onto the account, so there has to be an account to write it to.
    if (!isAuthenticated) {
      onClose();
      onRequireAuth?.();
      return;
    }
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    unlockCourse(course.id, { razorpayPaymentId: paymentId });
    setShowRazorpay(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full flex items-center justify-center backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Banner */}
          <div className="relative h-56 sm:h-72 w-full bg-slate-950 flex-shrink-0">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm">
                  {course.category} • {course.group}
                </span>
                <span className="px-2.5 py-1 bg-slate-800/80 backdrop-blur-md text-slate-200 text-xs font-medium rounded-lg border border-slate-700">
                  {course.subject}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {course.rating} ({course.reviewCount} student reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {course.title}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Action Bar (Price & Buy / Learn Button) */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sneha Gupta Fastrack Course</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                    50% OFF
                  </span>
                </div>
              </div>

              {purchased ? (
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenVideoPlayer) {
                      const firstVid = course.chapters[0]?.videos[0]?.id;
                      if (firstVid) onOpenVideoPlayer(course.id, firstVid);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Already Unlocked • Continue Learning</span>
                </button>
              ) : (
                <button
                  onClick={handleBuyClick}
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAuthenticated ? `Buy Course Now (₹${course.price})` : 'Login to Buy This Course'}</span>
                </button>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">About This Fastrack Course</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{course.longDescription}</p>
            </div>

            {/* Chapter Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Course Chapters & Content ({course.chapters.length} Chapters)
                </h3>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Total Duration: {course.duration}
                </span>
              </div>

              <div className="space-y-3">
                {course.chapters.map((chapter, idx) => {
                  const isOpenChap = activeChapterIndex === idx;
                  return (
                    <div
                      key={chapter.id}
                      className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/40"
                    >
                      <button
                        onClick={() => setActiveChapterIndex(isOpenChap ? -1 : idx)}
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 transition"
                      >
                        <div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Chapter {idx + 1}</p>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{chapter.title}</h4>
                        </div>
                        {isOpenChap ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      {isOpenChap && (
                        <div className="p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                          {/* Videos list */}
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Video Lessons ({chapter.videos.length})
                            </p>
                            {chapter.videos.map((vid) => (
                              <div
                                key={vid.id}
                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition"
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <PlayCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                                    {vid.title}
                                  </span>
                                  {vid.isFreePreview && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                      FREE PREVIEW
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-slate-400 text-[11px] font-mono">{vid.duration}</span>
                                  {purchased || vid.isFreePreview ? (
                                    <button
                                      onClick={() => {
                                        onClose();
                                        if (onOpenVideoPlayer) onOpenVideoPlayer(course.id, vid.id);
                                      }}
                                      className="px-2.5 py-1 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-blue-900/40 dark:text-blue-300 font-semibold rounded-lg transition"
                                    >
                                      Watch
                                    </button>
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* PDFs list */}
                          {chapter.pdfs.length > 0 && (
                            <div className="pt-3 space-y-2">
                              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Handwritten Notes & Question Bank
                              </p>
                              {chapter.pdfs.map((pdf) => (
                                <div
                                  key={pdf.id}
                                  className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs"
                                >
                                  <div className="flex items-center gap-2.5 truncate">
                                    <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                                      {pdf.title}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setSelectedPdf(pdf)}
                                    className="px-2.5 py-1 bg-slate-200 hover:bg-blue-600 hover:text-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition flex items-center gap-1"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Preview / PDF</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Modal Overlay */}
      <RazorpayModal
        isOpen={showRazorpay}
        onClose={() => setShowRazorpay(false)}
        title={course.title}
        amount={course.price}
        itemDescription={`Course purchase: ${course.title}`}
        receiptId={`course_${course.id}_${user?.id || 'guest'}`}
        itemType="course"
        itemId={course.id}
        prefill={{ name: user?.name, email: user?.email, contact: user?.phone }}
        onSuccess={handlePaymentSuccess}
      />

      {/* PDF Viewer Overlay */}
      {selectedPdf && (
        <PdfViewerModal
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          title={selectedPdf.title}
          fileUrl={selectedPdf.fileUrl}
          type={selectedPdf.type}
          pageCount={selectedPdf.pageCount}
        />
      )}
    </>
  );
};