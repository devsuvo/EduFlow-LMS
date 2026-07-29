'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  ChevronDown,
  X,
  ShoppingCart,
  Check,
  Sparkles,
} from 'lucide-react';
import { COURSES, CATEGORIES, Course } from '@/lib/lms-data';

interface CourseSearchViewProps {
  initialSearchQuery?: string;
  onSelectCourse: (courseId: string) => void;
  onAddToCart: (courseId: string) => void;
  cartItemIds: string[];
}

export function CourseSearchView({
  initialSearchQuery = '',
  onSelectCourse,
  onAddToCart,
  cartItemIds,
}: CourseSearchViewProps) {
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPriceType, setSelectedPriceType] = useState<'All' | 'Paid' | 'Free'>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price-low'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filtered = COURSES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchesRating = c.rating >= selectedRating;
    const matchesPrice =
      selectedPriceType === 'All'
        ? true
        : selectedPriceType === 'Free'
        ? c.isFree || c.price === 0
        : c.price > 0;

    return matchesSearch && matchesCategory && matchesLevel && matchesRating && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    return b.enrolledCount - a.enrolledCount;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl gradient-bg text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduFlow Course Search Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore 5,000+ Enterprise Courses
          </h1>
          <p className="text-blue-100 text-sm">
            Filter by skill level, instructor credentials, topics, or AI ratings to find your next career milestone.
          </p>
        </div>
      </div>

      {/* Main Search & Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Controls */}
        <div className="hidden lg:block space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Filter Courses
            </h3>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSelectedRating(0);
                setSelectedPriceType('All');
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search titles, tags..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">{cat.coursesCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Skill Level
            </label>
            <div className="space-y-1.5 text-xs">
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="space-y-1 text-xs">
              {[4.5, 4.0, 3.5, 0].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setSelectedRating(stars)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                    selectedRating === stars
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                  </span>
                  <span>{stars > 0 ? `${stars} & Up` : 'All Ratings'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar Sort & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="text-slate-600 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> results
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 p-6">
              <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your search filters or resetting keywords.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => {
                const inCart = cartItemIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                        {course.level}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mb-1">
                          {course.category}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-500 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating}
                          </span>
                          <span className="text-slate-400 text-[11px]">{course.durationHours} Hours</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">
                            ${course.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(course.id);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                              inCart
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                            {inCart ? 'Enrolled' : 'Enroll'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
