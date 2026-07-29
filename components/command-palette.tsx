'use client';

import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, Layers, Sparkles, X, ArrowRight } from 'lucide-react';
import { COURSES, CATEGORIES, INSTRUCTORS } from '@/lib/lms-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectCategory,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open command palette from parent if supported, or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCourses = COURSES.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredInstructors = INSTRUCTORS.filter(
    (inst) =>
      inst.name.toLowerCase().includes(query.toLowerCase()) ||
      inst.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, categories, instructors, or topics... (ESC to close)"
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 text-sm">
          {/* Quick AI Suggestion */}
          {query.length > 2 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-blue-700 dark:text-blue-300">
                <Sparkles className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>Ask EduFlow AI Tutor about <strong>&quot;{query}&quot;</strong></span>
              </div>
              <span className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full font-medium">
                AI Q&A
              </span>
            </div>
          )}

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Courses ({filteredCourses.length})
              </div>
              <div className="space-y-1">
                {filteredCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-12 h-10 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {course.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{course.category}</span>
                        <span>•</span>
                        <span>{course.instructor.name}</span>
                        <span>•</span>
                        <span className="text-amber-500 font-medium">★ {course.rating}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-left transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{cat.name}</div>
                      <div className="text-xs text-slate-500">{cat.coursesCount} Courses</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instructors */}
          {filteredInstructors.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Top Instructors
              </div>
              <div className="space-y-1">
                {filteredInstructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100 truncate">{inst.name}</div>
                      <div className="text-xs text-slate-500 truncate">{inst.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 &&
            filteredCategories.length === 0 &&
            filteredInstructors.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No matching courses or topics found for &quot;{query}&quot;.
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Navigate with arrows or type to search</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
