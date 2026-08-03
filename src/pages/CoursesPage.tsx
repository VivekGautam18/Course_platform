import React, { useState } from 'react';
import { Course } from '../types';
import { useData } from '../context/DataContext';
import { Search, Filter, BookOpen, Star, Clock, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface CoursesPageProps {
  onOpenCourseModal: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenCourseModal }) => {
  const { courses, isCoursePurchased } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || course.group === selectedGroup;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesGroup && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 text-xs font-bold rounded-full w-fit">
          <span className="flex h-2 w-2 rounded-full bg-[#2563EB]" />
          <span>ICAI Syllabus Aligned</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Chapter-wise Fastrack Courses
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          High-yield video lectures, handwritten revision notes, and past 10 attempts question bank solutions.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Tax, Audit, Costing..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-full outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-full dark:bg-slate-900 dark:text-white outline-none"
          >
            <option value="all">All Categories</option>
            <option value="CA Inter">CA Inter</option>
            <option value="CA Final">CA Final</option>
          </select>

          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-full dark:bg-slate-900 dark:text-white outline-none"
          >
            <option value="all">All Groups</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const purchased = isCoursePurchased(course.id);
          return (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                    {course.category} • {course.group}
                  </div>
                  {purchased && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      UNLOCKED
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{course.subject}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {course.rating} ({course.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      {course.chapters.length} Chapters
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1">₹{course.originalPrice}</span>
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenCourseModal(course)}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition ${
                    purchased
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  {purchased ? 'Start Learning' : 'View Course & Buy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
