'use client';

import React from 'react';
import {
  Code,
  Sparkles,
  Briefcase,
  Palette,
  TrendingUp,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface CategoriesSectionProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCategory: (categoryName: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  DollarSign: <DollarSign className="w-6 h-6" />,
};

export function CategoriesSection({ onNavigate, onSelectCategory }: CategoriesSectionProps) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            Top Learning Categories
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Explore Skills Across Disciplines
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Browse structured learning paths engineered for corporate readiness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              onSelectCategory(cat.name);
              onNavigate('public-courses');
            }}
            className="group p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {ICON_MAP[cat.icon] || <Code className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>{cat.coursesCount} Courses</span>
              <span className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
