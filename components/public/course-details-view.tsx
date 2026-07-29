'use client';

import React, { useState } from 'react';
import {
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  PlayCircle,
  Users,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  ShoppingCart,
  Lock,
  Globe,
  FileText,
  MessageSquare,
  Sparkles,
  X,
  Download,
  QrCode,
} from 'lucide-react';
import { COURSES, Course } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface CourseDetailsViewProps {
  courseId: string;
  onNavigate: (view: ViewMode) => void;
  onAddToCart: (courseId: string) => void;
  cartItemIds: string[];
}

export function CourseDetailsView({
  courseId,
  onNavigate,
  onAddToCart,
  cartItemIds,
}: CourseDetailsViewProps) {
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([course.modules[0]?.id || '']);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const inCart = cartItemIds.includes(course.id);

  const toggleModule = (modId: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner & Title Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            {/* Category & Badge */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                {course.level} Level
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" /> {course.rating} ({course.reviewsCount} reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {course.subtitle}
            </p>

            {/* Meta stats */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span>Created by <strong className="text-white">{course.instructor.name}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" /> {course.language}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" /> Last Updated {course.lastUpdated}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" /> {course.enrolledCount.toLocaleString()} Students
              </div>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white space-y-4 shadow-xl">
              <div
                onClick={() => setTrailerOpen(true)}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-slate-200 dark:border-slate-800"
              >
                <img
                  src={course.thumbnail}
                  alt="Course Trailer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px]">
                  Watch Trailer
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                  )}
                </div>
                <span className="text-xs text-emerald-600 font-bold">55% OFF</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onAddToCart(course.id);
                    onNavigate('player');
                  }}
                  className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" /> Start Learning Now
                </button>

                <button
                  onClick={() => setCertModalOpen(true)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-500" /> Preview Certificate
                </button>
              </div>

              <div className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Full lifetime access
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Access on mobile, tablet & desktop
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 30-Day Money-Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Learning Outcomes */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" /> What You Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Course Curriculum ({course.modules.length} Modules)
              </h3>
              <div className="text-xs text-slate-500">
                {course.totalLessons} Lessons • {course.durationHours} Hours Total
              </div>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod) => {
                const isOpen = openModuleIds.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{mod.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{mod.lessons.length} lessons • {mod.duration}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 space-y-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                        {mod.lessons.map((les) => (
                          <div
                            key={les.id}
                            onClick={() => onNavigate('player')}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <PlayCircle className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                              <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                                {les.title}
                              </span>
                            </div>
                            <span className="text-slate-400 font-mono">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Bio Profile */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Instructor</h3>
            <div className="flex items-start gap-4">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{course.instructor.name}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{course.instructor.title}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>★ {course.instructor.rating} Rating</span>
                  <span>•</span>
                  <span>{course.instructor.studentsCount.toLocaleString()} Students</span>
                  <span>•</span>
                  <span>{course.instructor.coursesCount} Courses</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Video Modal */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl space-y-2">
            <div className="p-4 flex items-center justify-between border-b border-slate-800 text-white">
              <span className="font-bold text-sm">Course Trailer: {course.title}</span>
              <button onClick={() => setTrailerOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={course.trailerVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Verified Certificate Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center relative">
            <button
              onClick={() => setCertModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-blue-500/30 space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
                <Award className="w-5 h-5" /> EduFlow Verified Certification
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Certificate of Completion
              </h2>
              <p className="text-xs text-slate-500">This certifies that</p>
              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                Alex Student
              </div>
              <p className="text-xs text-slate-500">has successfully completed the enterprise program</p>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 max-w-md mx-auto">
                &quot;{course.title}&quot;
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>Verify ID: EDU-2026-948271</div>
                <div className="flex items-center gap-1">
                  <QrCode className="w-4 h-4 text-slate-500" /> Scannable QR
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Certificate (PDF)
              </button>
              <button
                onClick={() => setCertModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
