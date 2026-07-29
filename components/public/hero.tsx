'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  PlayCircle,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Star,
  Shield,
  Zap,
} from 'lucide-react';
import { ViewMode } from '../navbar';

interface HeroProps {
  onNavigate: (view: ViewMode) => void;
  onSearchSubmit: (query: string) => void;
}

export function Hero({ onNavigate, onSearchSubmit }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      onNavigate('public-courses');
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>EduFlow LMS 3.0 • Powered by Gemini AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Learn Smarter.{' '}
              <span className="gradient-text">Teach Better.</span>{' '}
              Grow Faster.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empower your career with 5,000+ enterprise-grade online courses. Learn from industry experts at Google, Vercel, and Stripe with interactive AI study tutors, hands-on coding playgrounds, and shareable verified certificates.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative flex items-center p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus-within:border-blue-500 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn today? (e.g., Next.js 15, Generative AI, Figma)..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gradient-bg text-white font-medium text-sm hover:opacity-90 transition-opacity shrink-0 flex items-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 pl-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">Popular Searches:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Next.js 15');
                    onNavigate('public-courses');
                  }}
                  className="hover:text-blue-600 underline"
                >
                  Next.js 15
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Generative AI');
                    onNavigate('public-courses');
                  }}
                  className="hover:text-blue-600 underline"
                >
                  Generative AI
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Figma');
                    onNavigate('public-courses');
                  }}
                  className="hover:text-blue-600 underline"
                >
                  Design Systems
                </button>
              </div>
            </form>

            {/* Trust Bullet Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>24/7 AI Learning Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Self-Paced or Live Classes</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Preview Card */}
              <div className="glass-panel p-6 rounded-3xl shadow-2xl space-y-5 border border-slate-200/80 dark:border-slate-800">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Live Q&A Session
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold">
                    1,240 Enrolled
                  </span>
                </div>

                {/* Video Image Preview */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800">
                  <img
                    src="https://picsum.photos/seed/lms_hero_preview/800/500"
                    alt="Course Preview"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                    <button
                      onClick={() => onNavigate('player')}
                      className="w-14 h-14 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      <PlayCircle className="w-8 h-8 fill-blue-600 text-white ml-0.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/80 backdrop-blur-md rounded-xl text-white text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold truncate">Next.js 15 Server Architecture</div>
                      <div className="text-[10px] text-slate-300">With Alex Rivera • Ex-Vercel</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Floating Stat Overlay Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">1.2M+</div>
                      <div className="text-[11px] text-slate-500">Global Learners</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">99.8%</div>
                      <div className="text-[11px] text-slate-500">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Brand Logos Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by corporate training teams & engineers at top companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Google</span>
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Stripe</span>
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Vercel</span>
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Airbnb</span>
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Microsoft</span>
            <span className="font-bold text-lg text-slate-700 dark:text-slate-300">Figma</span>
          </div>
        </div>
      </div>
    </section>
  );
}
