'use client';

import React from 'react';
import { Star, Quote, Award, Sparkles, Building2 } from 'lucide-react';
import { SUCCESS_STORIES } from '@/lib/lms-data';

export function SuccessStories() {
  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Student Impact Stories
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            How EduFlow LMS Transforms Tech Careers
          </h2>
          <p className="text-slate-400 text-sm">
            Real outcomes from engineers, product leads, and designers at top companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-500 opacity-60" />
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  &quot;{story.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{story.outcomes}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-600"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{story.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {story.role} @ {story.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
