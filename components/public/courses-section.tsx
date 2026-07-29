'use client';

import React, { useState } from 'react';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Check,
  Heart,
  ShoppingCart,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { COURSES, CATEGORIES, Course } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface CoursesSectionProps {
  onSelectCourse: (courseId: string) => void;
  onNavigate: (view: ViewMode) => void;
  onAddToCart: (courseId: string) => void;
  cartItemIds: string[];
}

export function CoursesSection({
  onSelectCourse,
  onNavigate,
  onAddToCart,
  cartItemIds,
}: CoursesSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const toggleWishlist = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses =
    selectedCat === 'All'
      ? COURSES
      : COURSES.filter((c) => c.category === selectedCat);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              World-Class Curriculum
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Explore Featured & Bestselling Courses
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Learn in-demand skills from verified tech executives, AI researchers, and principal architects.
            </p>
          </div>

          <button
            onClick={() => onNavigate('public-courses')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <span>View All 5,000+ Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCat('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCat === 'All'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat.name
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const inCart = cartItemIds.includes(course.id);
            const inWishlist = wishlistIds.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Thumbnail & Badges */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    {course.isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] shadow-sm">
                        Bestseller
                      </span>
                    )}
                    {course.isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px] shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(course.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        inWishlist ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Course Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Level */}
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>{course.category}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                        {course.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                        {course.instructor.name}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Stats */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{course.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({course.reviewsCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.durationHours}h
                        </span>
                        <span>•</span>
                        <span>{course.totalLessons} lessons</span>
                      </div>
                    </div>

                    {/* Price Tag & Add to Cart */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(course.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          inCart
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Enrolled
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" /> Enroll
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
