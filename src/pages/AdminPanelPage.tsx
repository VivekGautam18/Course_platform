import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  Users,
  CreditCard,
  GraduationCap,
  Calendar,
  Star,
  FileText,
  Video,
  CheckCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Course, Chapter, Video as VideoType, PDFResource } from '../types';

export const AdminPanelPage: React.FC = () => {
  const {
    courses,
    mentorships,
    testimonials,
    mentorshipEnrollments,
    strategyBookings,
    payments,
    addCourse,
    deleteCourse,
    addChapterToCourse,
    updateMentorshipPrice,
    deleteTestimonial,
  } = useData();

  const [activeTab, setActiveAdminTab] = useState<
    'courses' | 'mentorship' | 'strategy' | 'testimonials' | 'payments' | 'students'
  >('courses');

  // Create Course Form State
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [cTitle, setCTitle] = useState('');
  const [cSubject, setCSubject] = useState('Taxation');
  const [cCategory, setCCategory] = useState<'CA Inter' | 'CA Final'>('CA Inter');
  const [cGroup, setCGroup] = useState<'Group 1' | 'Group 2' | 'Both Groups'>('Group 1');
  const [cDescription, setCDescription] = useState('');
  const [cThumbnail, setCThumbnail] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  );
  const [cDuration, setCDuration] = useState('35 Hours');
  const [cPrice, setCPrice] = useState(1499);
  const [cOriginalPrice, setCOriginalPrice] = useState(2999);

  // Add Chapter / Video Modal State
  const [selectedCourseForChapter, setSelectedCourseForChapter] = useState<Course | null>(null);
  const [chapTitle, setChapTitle] = useState('');
  const [chapDesc, setChapDesc] = useState('');
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  );
  const [vidDuration, setVidDuration] = useState('30:00');
  const [pdfTitle, setPdfTitle] = useState('');

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      title: cTitle,
      subject: cSubject,
      category: cCategory,
      group: cGroup,
      description: cDescription,
      longDescription: cDescription,
      thumbnail: cThumbnail,
      duration: cDuration,
      price: cPrice,
      originalPrice: cOriginalPrice,
      chapters: [
        {
          id: `ch_init_${Date.now()}`,
          title: 'Chapter 1: Foundations & Core Principles',
          description: 'Basic introduction and exam-focused concepts',
          videos: [
            {
              id: `v_init_${Date.now()}`,
              title: '1. Introduction Lecture',
              duration: '25:00',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              isFreePreview: true,
              order: 1,
            },
          ],
          pdfs: [
            {
              id: `p_init_${Date.now()}`,
              title: 'Handwritten Summary Notes',
              type: 'notes',
              fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              pageCount: 20,
              sizeMb: '2.5 MB',
            },
          ],
        },
      ],
    });
    setShowAddCourseModal(false);
    setCTitle('');
  };

  const handleAddChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForChapter) return;

    const newChap: Omit<Chapter, 'id'> = {
      title: chapTitle,
      description: chapDesc,
      videos: vidTitle
        ? [
            {
              id: `v_${Date.now()}`,
              title: vidTitle,
              duration: vidDuration,
              videoUrl: vidUrl,
              isFreePreview: true,
              order: 1,
            },
          ]
        : [],
      pdfs: pdfTitle
        ? [
            {
              id: `p_${Date.now()}`,
              title: pdfTitle,
              type: 'notes',
              fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              pageCount: 30,
              sizeMb: '3.0 MB',
            },
          ]
        : [],
    };

    addChapterToCourse(selectedCourseForChapter.id, newChap);
    setSelectedCourseForChapter(null);
    setChapTitle('');
    setVidTitle('');
    setPdfTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Admin Title Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Sneha Gupta Administrative Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold mt-1">Course & Platform Management Panel</h1>
        </div>

        <button
          onClick={() => setShowAddCourseModal(true)}
          className="px-5 py-2.5 bg-white text-amber-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-amber-50 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveAdminTab('courses')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'courses' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Manage Courses ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('mentorship')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'mentorship' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Mentorship Programs</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('strategy')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'strategy' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>1:1 Strategy Calls ({strategyBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('testimonials')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'testimonials' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Student Reviews ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'payments' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Razorpay Payment Audit ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('students')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'students' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Enrolled Students ({mentorshipEnrollments.length})</span>
        </button>
      </div>

      {/* TAB: COURSES MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-md">
                    {course.category} • {course.group}
                  </span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{course.price}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{course.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>

                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">
                    Chapters ({course.chapters.length}):
                  </p>
                  <ul className="list-disc list-inside text-slate-500">
                    {course.chapters.map((ch) => (
                      <li key={ch.id} className="truncate">
                        {ch.title} ({ch.videos.length} Vids, {ch.pdfs.length} PDFs)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCourseForChapter(course)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Video/PDF Chapter</span>
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: MENTORSHIP PRICES */}
      {activeTab === 'mentorship' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentorships.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {m.examTerm}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{m.groupType}</h4>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-500">Price (₹):</label>
                <input
                  type="number"
                  value={m.price}
                  onChange={(e) => updateMentorshipPrice(m.id, Number(e.target.value))}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: STRATEGY CALLS */}
      {activeTab === 'strategy' && (
        <div className="space-y-3">
          {strategyBookings.map((sb) => (
            <div
              key={sb.id}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-blue-600">{sb.studentName} ({sb.contactNumber})</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{sb.date} @ {sb.timeSlot}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">Struggle: {sb.primaryStruggle}</p>
              <p className="text-slate-400 font-mono">Payment ID: {sb.paymentId} (₹{sb.amountPaid})</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-start gap-3 text-xs"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{t.studentName} ({t.studentAttempt})</p>
                <p className="text-slate-500 mt-1">"{t.reviewText}"</p>
              </div>
              <button
                onClick={() => deleteTestimonial(t.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB: PAYMENTS AUDIT */}
      {activeTab === 'payments' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-bold">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Item Unlocked</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Razorpay Payment ID</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-semibold">{p.userName} ({p.userEmail})</td>
                  <td className="p-3">{p.itemTitle}</td>
                  <td className="p-3 font-bold text-emerald-600">₹{p.amount}</td>
                  <td className="p-3 font-mono text-blue-600">{p.razorpayPaymentId}</td>
                  <td className="p-3 text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: ENROLLED STUDENTS */}
      {activeTab === 'students' && (
        <div className="space-y-3">
          {mentorshipEnrollments.map((me) => (
            <div
              key={me.id}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-1"
            >
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>{me.studentName} ({me.mobile})</span>
                <span className="text-blue-600">{me.mentorshipTitle}</span>
              </div>
              <p className="text-slate-500">Attempt: {me.attempt} • College: {me.college}</p>
              <p className="text-slate-500">Preparation Level: {me.currentPreparationLevel}</p>
            </div>
          ))}
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full space-y-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Create Fastrack Course</h3>
            <form onSubmit={handleCreateCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold">Course Title</label>
                <input
                  type="text"
                  required
                  value={cTitle}
                  onChange={(e) => setCTitle(e.target.value)}
                  placeholder="CA Inter Corporate Law Fastrack"
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold">Subject</label>
                  <input
                    type="text"
                    required
                    value={cSubject}
                    onChange={(e) => setCSubject(e.target.value)}
                    className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={cPrice}
                    onChange={(e) => setCPrice(Number(e.target.value))}
                    className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold">Description</label>
                <textarea
                  value={cDescription}
                  onChange={(e) => setCDescription(e.target.value)}
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CHAPTER MODAL */}
      {selectedCourseForChapter && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full space-y-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Add Chapter to {selectedCourseForChapter.title}
            </h3>
            <form onSubmit={handleAddChapterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold">Chapter Title *</label>
                <input
                  type="text"
                  required
                  value={chapTitle}
                  onChange={(e) => setChapTitle(e.target.value)}
                  placeholder="Chapter 2: GST Supply & ITC"
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold">Video Lesson Title (Optional)</label>
                <input
                  type="text"
                  value={vidTitle}
                  onChange={(e) => setVidTitle(e.target.value)}
                  placeholder="1. ITC Restrictions Rule 36(4)"
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold">Video URL (HTML5 / Google Storage / MP4)</label>
                <input
                  type="url"
                  value={vidUrl}
                  onChange={(e) => setVidUrl(e.target.value)}
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold">Handwritten PDF Notes Title (Optional)</label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  placeholder="GST Flowcharts PDF"
                  className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCourseForChapter(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl">
                  Add Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
