import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ShieldAlert,
  Award,
  Calendar,
  Layers,
  MessageSquare,
  Calculator,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenStudyPlanner: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenStudyPlanner,
  onOpenAuthModal,
}) => {
  const { user, isAuthenticated, isAdmin, logout, toggleDemoAdmin } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'strategy', label: 'Strategy Session' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2563EB] rounded-lg text-white font-bold italic text-lg shadow-md shadow-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white tracking-tight">
                  Sneha Gupta
                </span>
                <span className="text-[10px] font-bold bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  CA Finalist
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition ${
                  activeTab === item.id
                    ? 'text-[#2563EB] font-semibold underline underline-offset-8'
                    : 'hover:text-[#2563EB]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={onOpenStudyPlanner}
              className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full hover:bg-indigo-100 transition flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Study Planner</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Toggle Button */}
            <button
              onClick={toggleDemoAdmin}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition flex items-center gap-1.5 border ${
                isAdmin
                  ? 'bg-amber-500/10 text-amber-600 border-amber-300 dark:text-amber-400'
                  : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
              }`}
              title="Switch between Student and Admin mode"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin Mode ON' : 'Switch to Admin'}</span>
            </button>

            {/* User Auth state */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-5 py-2 text-xs font-semibold rounded-full transition shadow-sm flex items-center gap-2 ${
                    activeTab === 'dashboard'
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200/50'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 text-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Dashboard</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3.5 py-2 text-xs font-bold rounded-full transition ${
                      activeTab === 'admin'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#2563EB]"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('mentorship')}
                  className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-200/50 dark:shadow-none transition"
                >
                  Enroll Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 rounded-xl"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenStudyPlanner();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-semibold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Smart Study Planner</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleDemoAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-600 border border-amber-300 flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Mode Active' : 'Switch to Admin Demo'}</span>
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm"
                >
                  My Student Dashboard
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl text-sm"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-red-600 text-xs font-bold hover:bg-red-50 rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm"
              >
                Student Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
