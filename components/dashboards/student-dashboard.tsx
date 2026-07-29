'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  PlayCircle,
  Calendar,
  Sparkles,
  Search,
  FileText,
  BarChart3,
  Bookmark,
  TrendingUp,
} from 'lucide-react';
import { COURSES, INITIAL_STUDENT_PROGRESS } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface StudentDashboardProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCourse: (courseId: string) => void;
}

export function StudentDashboard({ onNavigate, onSelectCourse }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'certificates' | 'quizzes' | 'schedule'>('overview');

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://picsum.photos/seed/user_student/150/150"
            alt="Alex Student"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, Alex!</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 12 Day Streak
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pro Learner • Next Goal: Complete Module 3 of Next.js 15 Masterclass
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('player')}
          className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity shrink-0"
        >
          <PlayCircle className="w-4 h-4" /> Resume Next.js Lesson
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">4</div>
          <div className="text-[11px] text-emerald-600 font-medium">2 In Active Progress</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Learning Hours</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">48.5h</div>
          <div className="text-[11px] text-blue-600 font-medium">+6.2h this week</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Certificates Earned</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">2</div>
          <div className="text-[11px] text-amber-600 font-medium">Verified & Shareable</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Quiz Average</span>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">94%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Top 5% of cohort</div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          My Courses (4)
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'certificates'
              ? 'bg-blue-600 text-white font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Certificates
        </button>
      </div>

      {/* Continue Learning Section */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-blue-600" /> Continue Learning
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.slice(0, 2).map((course, idx) => (
            <div
              key={course.id}
              onClick={() => onNavigate('player')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer flex gap-4 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-24 h-20 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 space-y-2 min-w-0">
                <div className="text-[11px] text-blue-600 font-semibold">{course.category}</div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {course.title}
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Progress</span>
                    <span>{idx === 0 ? '65%' : '30%'}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: idx === 0 ? '65%' : '30%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
