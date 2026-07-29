'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  BookOpen,
  Plus,
  BarChart3,
  Video,
  FileText,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { COURSES } from '@/lib/lms-data';

export function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'builder' | 'students' | 'revenue'>('overview');

  // Course builder state
  const [builderStep, setBuilderStep] = useState(1);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Programming & Web Dev');
  const [newCoursePrice, setNewCoursePrice] = useState('79.99');
  const [modules, setModules] = useState([
    { id: 'm1', title: 'Module 1: Getting Started', lessons: ['Intro Video', 'Setup Node.js'] },
  ]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [coursePublished, setCoursePublished] = useState(false);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: `Module ${modules.length + 1}: New Topic`, lessons: [] }]);
  };

  const handleAddLesson = (modId: string) => {
    if (!newLessonTitle.trim()) return;
    setModules(
      modules.map((m) =>
        m.id === modId ? { ...m, lessons: [...m.lessons, newLessonTitle] } : m
      )
    );
    setNewLessonTitle('');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Instructor Studio</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              Top Educator Badge
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your courses, create new curricula, track payouts, and engage with your students.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('builder');
            setBuilderStep(1);
          }}
          className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">$48,250</div>
          <div className="text-[11px] text-emerald-600 font-medium">+18.4% this month</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Students</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">3,420</div>
          <div className="text-[11px] text-blue-600 font-medium">+240 new enrollments</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Published Courses</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">12</div>
          <div className="text-[11px] text-purple-600 font-medium">All approved</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Instructor Rating</span>
            <BarChart3 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">4.95 ★</div>
          <div className="text-[11px] text-amber-600 font-medium">Based on 3,840 reviews</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'overview' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'courses' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'builder' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Course Builder Wizard
        </button>
      </div>

      {/* Course Builder Tab */}
      {activeTab === 'builder' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" /> Drag & Drop Course Builder
              </h3>
              <p className="text-xs text-slate-500">Step {builderStep} of 3</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    builderStep === step ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {builderStep === 1 && (
            <div className="space-y-4 text-xs max-w-xl">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Master Next.js 15 & Server Actions Architecture"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Category
                </label>
                <select
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Programming & Web Dev">Programming & Web Dev</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                  <option value="Business & Leadership">Business & Leadership</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Price ($ USD)
                </label>
                <input
                  type="text"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                onClick={() => setBuilderStep(2)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Next: Curriculum Builder →
              </button>
            </div>
          )}

          {builderStep === 2 && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">Modules & Lessons</span>
                <button
                  onClick={handleAddModule}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Module
                </button>
              </div>

              <div className="space-y-4">
                {modules.map((mod) => (
                  <div key={mod.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{mod.title}</div>
                    <div className="space-y-2">
                      {mod.lessons.map((les, lIdx) => (
                        <div key={lIdx} className="p-2.5 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-between border border-slate-200 dark:border-slate-700">
                          <span className="font-medium">{les}</span>
                          <span className="text-[10px] text-slate-400">Video Lesson</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                        placeholder="New lesson title..."
                        className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddLesson(mod.id)}
                        className="px-3 py-1.5 bg-slate-800 text-white rounded-xl font-bold"
                      >
                        Add Lesson
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setBuilderStep(1)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setBuilderStep(3)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Next: Upload & Publish →
                </button>
              </div>
            </div>
          )}

          {builderStep === 3 && (
            <div className="space-y-6 text-xs max-w-xl">
              <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center space-y-2 bg-slate-50 dark:bg-slate-800/40">
                <Video className="w-10 h-10 text-blue-500 mx-auto" />
                <div className="font-bold text-slate-900 dark:text-white">Drag & drop video files or thumbnail image</div>
                <div className="text-[11px] text-slate-400">Supports MP4, MOV, WEBM up to 4K resolution</div>
              </div>

              {coursePublished ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-800 rounded-2xl text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Course successfully published & submitted for Admin Approval!
                </div>
              ) : (
                <button
                  onClick={() => setCoursePublished(true)}
                  className="w-full py-3 rounded-xl gradient-bg text-white font-bold shadow-lg"
                >
                  Publish Course to EduFlow Catalog
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
