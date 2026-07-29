'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Moon,
  Sun,
  Bell,
  User,
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  PlayCircle,
  ShoppingCart,
  CheckCircle2,
} from 'lucide-react';

export type ViewMode =
  | 'public-home'
  | 'public-courses'
  | 'public-course-details'
  | 'public-pricing'
  | 'public-stories'
  | 'public-blog'
  | 'public-about'
  | 'public-contact'
  | 'player'
  | 'student-dash'
  | 'instructor-dash'
  | 'admin-dash';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenCart?: () => void;
  cartCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Navbar({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  cartCount,
  darkMode,
  onToggleDarkMode,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isPublic = currentView.startsWith('public');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('public-home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  EduFlow <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-semibold">LMS</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden lg:block">
                  Learn Smarter. Teach Better.
                </div>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Public site) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onNavigate('public-home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-home'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => onNavigate('public-courses')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-courses'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => onNavigate('public-pricing')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-pricing'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('public-stories')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-stories'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Success Stories
            </button>
            <button
              onClick={() => onNavigate('public-blog')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-blog'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate('public-contact')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'public-contact'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Mode/Role Switcher Buttons */}
          <div className="hidden xl:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-medium">
            <button
              onClick={() => onNavigate('student-dash')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                currentView === 'student-dash'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              onClick={() => onNavigate('player')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                currentView === 'player'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Course Player
            </button>
            <button
              onClick={() => onNavigate('instructor-dash')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                currentView === 'instructor-dash'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Instructor
            </button>
            <button
              onClick={() => onNavigate('admin-dash')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                currentView === 'admin-dash'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Command Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => (onOpenCart ? onOpenCart() : onNavigate('public-courses'))}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Saved Items"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 text-xs space-y-2">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span>Notifications</span>
                    <span className="text-blue-600 text-[10px]">Mark all read</span>
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        Certificate Verified!
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Your Next.js 15 certificate has been issued.
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl flex gap-2.5">
                    <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        New Live Q&A Session
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Dr. Sarah Jenkins is live in 30 mins!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Avatar / Portal */}
            <button
              onClick={() => onNavigate('student-dash')}
              className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
            >
              <img
                src="https://picsum.photos/seed/user_student/100/100"
                alt="Student Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden md:inline pr-1">
                Alex S.
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                onNavigate('public-home');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-slate-100 dark:bg-slate-800 font-medium"
            >
              Home Page
            </button>
            <button
              onClick={() => {
                onNavigate('public-courses');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-slate-100 dark:bg-slate-800 font-medium"
            >
              Browse Courses
            </button>
            <button
              onClick={() => {
                onNavigate('student-dash');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 font-semibold"
            >
              Student Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate('player');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 font-semibold"
            >
              Course Player
            </button>
            <button
              onClick={() => {
                onNavigate('instructor-dash');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-semibold"
            >
              Instructor Portal
            </button>
            <button
              onClick={() => {
                onNavigate('admin-dash');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 font-semibold"
            >
              Admin Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
