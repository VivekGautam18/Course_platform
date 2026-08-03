import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  BookOpen,
  PlayCircle,
  FileText,
  GraduationCap,
  Calendar,
  User,
  LogOut,
  Download,
  Clock,
  CheckCircle2,
  Sparkles,
  Video,
} from 'lucide-react';
import { Course, PDFResource } from '../types';
import { PdfViewerModal } from '../components/courses/PdfViewerModal';

interface DashboardPageProps {
  onOpenVideoPlayer: (courseId: string, videoId: string) => void;
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenVideoPlayer,
  setActiveTab,
}) => {
  const { user, logout, updateProfile } = useAuth();
  const {
    courses,
    studentPurchases,
    studentProgress,
    mentorshipEnrollments,
    strategyBookings,
  } = useData();

  const [activeTab, setActiveDashboardTab] = useState<
    'my_courses' | 'notes' | 'mentorship' | 'strategy' | 'profile'
  >('my_courses');

  const [selectedPdf, setSelectedPdf] = useState<PDFResource | null>(null);

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [attempt, setAttempt] = useState(user?.attempt || 'CA Inter Sept 2026');
  const [college, setCollege] = useState(user?.college || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Purchased Courses List
  const purchasedCourses = courses.filter((c) =>
    studentPurchases.courseIds.includes(c.id)
  );

  // All PDFs from purchased courses
  const purchasedPdfs = purchasedCourses.flatMap((c) =>
    c.chapters.flatMap((ch) => ch.pdfs)
  );

  // User Mentorship Enrollments
  const myEnrollments = mentorshipEnrollments.filter(
    (e) => e.userId === user?.id || e.studentEmail === user?.email
  );

  // User Strategy Bookings
  const myBookings = strategyBookings.filter(
    (b) => b.userId === user?.id || b.studentEmail === user?.email
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      attempt,
      college,
    });
    setProfileSuccessMsg('Profile updated successfully!');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>CA Aspirant Learning Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Target Attempt: <strong className="text-white">{user?.attempt || 'CA Inter Sept 2026'}</strong> • Email: {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Dashboard Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveDashboardTab('my_courses')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'my_courses'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Courses ({purchasedCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('notes')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Notes & Question Banks ({purchasedPdfs.length})</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('mentorship')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'mentorship'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Purchased Mentorship ({myEnrollments.length})</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('strategy')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'strategy'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Strategy Calls ({myBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveDashboardTab('profile')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* TAB CONTENT: MY COURSES */}
      {activeTab === 'my_courses' && (
        <div className="space-y-6">
          {purchasedCourses.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No Courses Unlocked Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Explore Sneha Gupta chapter-wise Fastrack courses to start streaming video lectures and downloading revision notes.
              </p>
              <button
                onClick={() => setActiveTab('courses')}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Browse All Fastrack Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasedCourses.map((course) => {
                const prog = studentProgress[course.id] || {
                  completedVideoIds: [],
                  overallProgressPercentage: 0,
                  lastWatchedVideoId: course.chapters[0]?.videos[0]?.id,
                };

                const firstVideoId = prog.lastWatchedVideoId || course.chapters[0]?.videos[0]?.id || '';

                return (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-0.5 rounded-md">
                          {course.category} • {course.subject}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                        {course.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                          <span>Overall Progress</span>
                          <span className="font-bold text-blue-600">{prog.overallProgressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full transition-all duration-300"
                            style={{ width: `${prog.overallProgressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">{course.duration} Duration</span>
                      <button
                        onClick={() => onOpenVideoPlayer(course.id, firstVideoId)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Continue Watching</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: NOTES & QUESTION BANKS */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Handwritten Notes & Question Bank Downloads
          </h3>
          {purchasedPdfs.length === 0 ? (
            <p className="text-xs text-slate-500">No PDF notes unlocked. Purchase a course to get instant access!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchasedPdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{pdf.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {pdf.type === 'notes' ? 'Summary Notes' : 'Question Bank'} • {pdf.sizeMb}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPdf(pdf)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / PDF</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MENTORSHIP */}
      {activeTab === 'mentorship' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Your Active Mentorship Enrollments</h3>
          {myEnrollments.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <p className="text-xs text-slate-500">You have not enrolled in any mentorship program yet.</p>
              <button
                onClick={() => setActiveTab('mentorship')}
                className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                View Mentorship Options
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myEnrollments.map((e) => (
                <div
                  key={e.id}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {e.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {e.paymentId}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{e.mentorshipTitle}</h4>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Student: {e.studentName} ({e.mobile})</p>
                    <p>Current Prep Level: {e.currentPreparationLevel}</p>
                    <p>College: {e.college}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                    <strong>WhatsApp Support Active:</strong> Sneha Gupta has received your profile and will send your weekly targets directly on WhatsApp!
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: STRATEGY */}
      {activeTab === 'strategy' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Booked 1:1 Strategy Sessions</h3>
          {myBookings.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <p className="text-xs text-slate-500">No 1:1 strategy calls booked.</p>
              <button
                onClick={() => setActiveTab('strategy')}
                className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Book 1:1 Call (₹799)
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md">
                      SCHEDULED CALL
                    </span>
                    <span className="text-xs text-slate-400">Date: {b.date} • {b.timeSlot}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">1:1 Session with Sneha Gupta</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Primary Focus: {b.primaryStruggle}</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
                    <span className="font-semibold">Meeting Link: {b.meetingLink}</span>
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg"
                    >
                      Join Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-xl space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Student Profile</h3>

          {profileSuccessMsg && (
            <p className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-xl">{profileSuccessMsg}</p>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">WhatsApp Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Attempt</label>
            <input
              type="text"
              value={attempt}
              onChange={(e) => setAttempt(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">College / Coaching</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
          >
            Save Profile Changes
          </button>
        </form>
      )}

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
    </div>
  );
};
