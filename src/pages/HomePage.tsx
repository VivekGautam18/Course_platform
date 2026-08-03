import React from 'react';
import { Course, MentorshipOption } from '../types';
import { useData } from '../context/DataContext';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Award,
  Users,
  Star,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  FileText,
  Video,
  PlayCircle,
  Zap,
} from 'lucide-react';
import { FREQUENTLY_ASKED_QUESTIONS } from '../data/initialData';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenCourseModal: (course: Course) => void;
  onOpenMentorshipModal: (mentorship: MentorshipOption) => void;
  onOpenStrategyModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenCourseModal,
  onOpenMentorshipModal,
  onOpenStrategyModal,
}) => {
  const { courses, mentorships, testimonials } = useData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION - CLEAN MINIMALISM */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 text-xs font-bold rounded-full w-fit">
                <span className="flex h-2 w-2 rounded-full bg-[#2563EB]" />
                <span>Sneha Gupta (CA Finalist) • Academic Mentor</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                Master CA Inter & Final with{' '}
                <span className="text-[#2563EB]">
                  Targeted Strategy
                </span>{' '}
                & 1:1 Mentorship
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                Clear your CA exams with confidence. Chapter-wise fastrack mastery, handwritten summary notes, RTP/MTP question banks, and personalized daily timetables curated by a CA Finalist.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/25 flex items-center gap-2 transition active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                </button>

                <button
                  onClick={() => setActiveTab('mentorship')}
                  className="px-8 py-4 bg-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition active:scale-95"
                >
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  <span>Join Mentorship</span>
                </button>

                <button
                  onClick={onOpenStrategyModal}
                  className="px-6 py-4 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 text-amber-900 font-bold text-sm rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-2 transition active:scale-95"
                >
                  <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>Book Call (₹799)</span>
                </button>
              </div>

              {/* Quick Stats Strip */}
              <div className="flex flex-wrap gap-8 sm:gap-12 border-t border-slate-100 dark:border-slate-800 pt-8 mt-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">5,000+</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Students Mentored</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2563EB]">94%</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Exam Pass Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100+</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Tax Exemptions</p>
                </div>
              </div>
            </div>

            {/* Right Side Frame */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 relative flex items-center justify-center">
                {/* Abstract Blur Accents */}
                <div className="absolute w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-60 pointer-events-none -top-10 -right-10" />
                <div className="absolute w-60 h-60 bg-blue-200 dark:bg-blue-800/20 rounded-full blur-3xl opacity-40 pointer-events-none -bottom-10 -left-10" />

                {/* Portrait Placeholder Container */}
                <div className="relative w-full max-w-[340px] h-[460px] bg-white dark:bg-slate-900 rounded-[36px] shadow-2xl border-8 border-white dark:border-slate-800 overflow-hidden flex flex-col">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Sneha Gupta CA Finalist"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-bold bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full w-fit mb-2">
                      CA FINALIST & EDUCATOR
                    </span>
                    <h3 className="font-bold text-xl text-white">Sneha Gupta</h3>
                    <p className="text-xs text-slate-300">Rank Holder Strategy Specialist</p>
                  </div>
                </div>

                {/* Floating Card */}
                <div className="absolute top-1/4 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-blue-50 dark:border-slate-700 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">ICAI Pattern</p>
                    <p className="text-[10px] text-slate-500">Updated Sept 26 / Jan 27</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY STUDY WITH SNEHA - 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
            Proven Learning Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Why CA Aspirants Prefer Sneha Gupta
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Designed to bridge the gap between reading ICAI material and scoring exemptions in exam conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Exam-Oriented Approach</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No unnecessary theoretical fluff. Every chapter focuses on ICAI evaluation criteria, mark weightage, and past 10 attempts trends.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Smart Section Mnemonics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Never forget Tax sections or Standard on Auditing (SA) numbers again with Sneha maam custom memory tricks.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">24/7 WhatsApp Doubt Support</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enrolled mentorship students get direct line access to Sneha Gupta on WhatsApp for instant doubt resolution.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Crisp Handwritten Notes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Downloadable, printable 1.5-day exam revision notes and RTP/MTP question banks with model answers.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
              Chapter-wise Mastery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Featured Fastrack Courses
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
          >
            <span>View All Courses ({courses.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {course.category} • {course.group}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{course.subject}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {course.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{course.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1">₹{course.originalPrice}</span>
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCourseModal(course)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENTORSHIP SECTION */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800">
              Structured Exam Success
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold">Mentorship Programs</h2>
            <p className="text-sm text-slate-300">
              Choose your exam cycle and group combination to get personal guidance from Sneha Gupta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorships.map((m) => (
              <div
                key={m.id}
                className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-6 hover:border-blue-500 transition"
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                      {m.examTerm}
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-2">{m.groupType}</h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{m.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-700 space-y-2">
                    {m.benefits.slice(0, 4).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-700">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-400">₹{m.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500 line-through">₹{m.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => onOpenMentorshipModal(m)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY SESSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
              1:1 Personal Call • ₹799
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Stuck with Backlogs or Revision Confusion?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Book a 45-minute live 1:1 strategy session with Sneha Gupta (CA Finalist). Receive a personalized study planner, subject-wise action plan, and remaining days roadmap.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenStrategyModal}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm rounded-2xl shadow-xl transition active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Book Strategy Call (₹799)</span>
            </button>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
            Real Student Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Student Reviews & Exam Exemptions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.studentName}
                    className="w-11 h-11 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.studentName}</h4>
                    <p className="text-xs text-slate-500">{t.studentAttempt}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  {t.examScore}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.reviewText}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-400">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">Verified Aspirant</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about courses and mentorship</p>
        </div>

        <div className="space-y-3">
          {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-2 text-left"
            >
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
