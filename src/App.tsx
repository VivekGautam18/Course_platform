import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { StrategyPage } from './pages/StrategyPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { VideoPlayerView } from './components/player/VideoPlayerView';

import { CourseDetailModal } from './components/courses/CourseDetailModal';
import { MentorshipFormModal } from './components/mentorship/MentorshipFormModal';
import { StrategyBookingModal } from './components/strategy/StrategyBookingModal';
import { StudyPlannerModal } from './components/planner/StudyPlannerModal';
import { LegalPage } from './pages/LegalPage';
import { Course, MentorshipOption } from './types';

function MainAppContent() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { courses } = useData();

  const [activeTab, setActiveTab] = useState<string>('home');

  // Video player state
  const [activePlayerCourseId, setActivePlayerCourseId] = useState<string | null>(null);
  const [activePlayerVideoId, setActivePlayerVideoId] = useState<string | undefined>(undefined);

  // Modals state
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedMentorshipForEnroll, setSelectedMentorshipForEnroll] = useState<MentorshipOption | null>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isPlannerModalOpen, setIsPlannerModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenVideoPlayer = (courseId: string, videoId: string) => {
    setActivePlayerCourseId(courseId);
    setActivePlayerVideoId(videoId);
  };

  // If in video player view mode
  if (activePlayerCourseId) {
    const course = courses.find((c) => c.id === activePlayerCourseId);
    if (course) {
      return (
        <VideoPlayerView
          course={course}
          initialVideoId={activePlayerVideoId}
          onBack={() => setActivePlayerCourseId(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStudyPlanner={() => setIsPlannerModalOpen(true)}
        onOpenAuthModal={() => {
          if (isAuthenticated) {
            setActiveTab('dashboard');
          } else {
            setIsAuthModalOpen(true);
          }
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenCourseModal={(c) => setSelectedCourseForDetail(c)}
            onOpenMentorshipModal={(m) => setSelectedMentorshipForEnroll(m)}
            onOpenStrategyModal={() => setIsStrategyModalOpen(true)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesPage onOpenCourseModal={(c) => setSelectedCourseForDetail(c)} />
        )}

        {activeTab === 'mentorship' && (
          <MentorshipPage onOpenMentorshipModal={(m) => setSelectedMentorshipForEnroll(m)} />
        )}

        {activeTab === 'strategy' && (
          <StrategyPage onOpenBookingModal={() => setIsStrategyModalOpen(true)} />
        )}

        {activeTab === 'reviews' && <ReviewsPage />}

        {activeTab === 'dashboard' && (
          isAuthenticated ? (
            <DashboardPage
              onOpenVideoPlayer={handleOpenVideoPlayer}
              setActiveTab={setActiveTab}
            />
          ) : (
            <AuthPage onSuccess={() => setActiveTab('dashboard')} />
          )
        )}

        {activeTab === "admin" && (
          isAuthenticated && isAdmin ? (
            <AdminPanelPage />
          ) : (
            <AuthPage onSuccess={() => setActiveTab("admin")} />
          )
        )}

        {activeTab === 'privacy' && <LegalPage initialTab="privacy" />}
        {activeTab === 'refund' && <LegalPage initialTab="refund" />}
        {activeTab === 'terms' && <LegalPage initialTab="terms" />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        isOpen={!!selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onOpenVideoPlayer={handleOpenVideoPlayer}
        onRequireAuth={() => setIsAuthModalOpen(true)}
      />

      <MentorshipFormModal
        mentorship={selectedMentorshipForEnroll}
        isOpen={!!selectedMentorshipForEnroll}
        onClose={() => setSelectedMentorshipForEnroll(null)}
      />

      <StrategyBookingModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />

      <StudyPlannerModal
        isOpen={isPlannerModalOpen}
        onClose={() => setIsPlannerModalOpen(false)}
      />

      {/* Login Modal Overlay */}
      {isAuthModalOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-1"
            >
              ✕
            </button>
            <AuthPage
              onSuccess={() => {
                setIsAuthModalOpen(false);
                setActiveTab('dashboard');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainAppContent />
      </DataProvider>
    </AuthProvider>
  );
}