import React, { useState } from 'react';
import { Course, Video } from '../../types';
import { useData } from '../../context/DataContext';
import {
  Play,
  Pause,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  ArrowLeft,
  BookOpen,
  Maximize,
  Volume2,
  Settings,
  Sparkles,
} from 'lucide-react';
import { PdfViewerModal } from '../courses/PdfViewerModal';

interface VideoPlayerViewProps {
  course: Course;
  initialVideoId?: string;
  onBack: () => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  course,
  initialVideoId,
  onBack,
}) => {
  const { studentProgress, markVideoCompleted, updateLastWatched } = useData();

  // Find all videos flat list
  const allVideos = course.chapters.flatMap((c) => c.videos);

  const [activeVideoId, setActiveVideoId] = useState<string>(
    initialVideoId || allVideos[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes'>('overview');
  const [selectedPdf, setSelectedPdf] = useState<any | null>(null);

  const activeVideo = allVideos.find((v) => v.id === activeVideoId) || allVideos[0];
  const activeVideoIndex = allVideos.findIndex((v) => v.id === activeVideoId);

  const prog = studentProgress[course.id] || {
    completedVideoIds: [],
    overallProgressPercentage: 0,
  };

  const isCurrentCompleted = prog.completedVideoIds.includes(activeVideo?.id || '');

  const handleSelectVideo = (vid: Video) => {
    setActiveVideoId(vid.id);
    updateLastWatched(course.id, vid.id);
    setIsPlaying(true);
  };

  const handleNextVideo = () => {
    if (activeVideoIndex < allVideos.length - 1) {
      const nextVid = allVideos[activeVideoIndex + 1];
      setActiveVideoId(nextVid.id);
      updateLastWatched(course.id, nextVid.id);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex > 0) {
      const prevVid = allVideos[activeVideoIndex - 1];
      setActiveVideoId(prevVid.id);
      updateLastWatched(course.id, prevVid.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Learning Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </button>
          <div className="hidden sm:block truncate">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
              {course.category} • {course.subject}
            </span>
            <h2 className="text-sm font-bold text-white truncate">{course.title}</h2>
          </div>
        </div>

        {/* Course Completion Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <p className="text-slate-400 font-medium">Course Progress</p>
            <p className="font-bold text-emerald-400">{prog.overallProgressPercentage}% Completed</p>
          </div>
          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${prog.overallProgressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Learning Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Video Player Container */}
        <div className="flex-1 bg-black flex flex-col justify-between">
          {/* HTML5 Video Player */}
          <div className="relative w-full aspect-video max-h-[65vh] bg-slate-950 flex items-center justify-center group">
            <video
              key={activeVideo?.id}
              src={activeVideo?.videoUrl}
              className="w-full h-full object-contain"
              controls
              autoPlay
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {/* Video Controls & Navigation Bar */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-blue-400 font-bold uppercase">Now Watching</p>
              <h3 className="text-base font-bold text-white leading-tight">{activeVideo?.title}</h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={activeVideoIndex === 0}
                onClick={handlePrevVideo}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-xl flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => activeVideo && markVideoCompleted(course.id, activeVideo.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition ${
                  isCurrentCompleted
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-800 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isCurrentCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>

              <button
                disabled={activeVideoIndex === allVideos.length - 1}
                onClick={handleNextVideo}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-xs font-semibold rounded-xl flex items-center gap-1 transition shadow-md shadow-blue-600/20"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lower Content Tabs (Overview & Notes Downloads) */}
          <div className="p-6 bg-slate-900/60 border-t border-slate-800 space-y-4">
            <div className="flex gap-4 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`text-xs font-bold pb-1 transition border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Course Overview
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`text-xs font-bold pb-1 transition border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                PDF Notes & Question Bank
              </button>
            </div>

            {activeTab === 'overview' ? (
              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed">{course.description}</p>
                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900 text-blue-300 font-medium">
                  <strong>Sneha Gupta Guidance:</strong> Revise notes after each video lesson. Write down key section numbers twice to build permanent retention!
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.chapters.flatMap((c) => c.pdfs).map((pdf) => (
                  <div
                    key={pdf.id}
                    className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-200 truncate">{pdf.title}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPdf(pdf)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Chapter & Video Playlist */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-[50vh] lg:h-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-900/90">
            <h3 className="font-bold text-slate-100 text-sm">Course Chapters</h3>
            <p className="text-xs text-slate-400">Select any video to stream instantly</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
            {course.chapters.map((chap, cIdx) => (
              <div key={chap.id} className="p-3 space-y-2">
                <p className="text-xs font-bold text-blue-400">
                  Chapter {cIdx + 1}: {chap.title}
                </p>
                <div className="space-y-1">
                  {chap.videos.map((vid) => {
                    const isActive = vid.id === activeVideoId;
                    const isCompleted = prog.completedVideoIds.includes(vid.id);

                    return (
                      <button
                        key={vid.id}
                        onClick={() => handleSelectVideo(vid)}
                        className={`w-full p-2.5 rounded-xl text-left transition flex items-start justify-between gap-2 text-xs ${
                          isActive
                            ? 'bg-blue-600/20 text-white border border-blue-500/40 font-semibold'
                            : 'hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2 truncate">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Play className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="truncate leading-tight">{vid.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5">{vid.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
