'use client';

import React, { useState } from 'react';
import { Clock, User, ArrowRight, Sparkles, BookOpen, X } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/lms-data';

export function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            EduFlow Engineering & AI Blog
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Latest Insights & Technology Trends
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Articles written by our top educators on React 19, Generative AI, and design systems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-slate-700 dark:text-slate-300">{post.author}</span>
              </div>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 text-xs font-bold">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-200 dark:border-slate-800">
              <img
                src={activeArticle.authorAvatar}
                alt={activeArticle.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{activeArticle.author}</div>
                <div>{activeArticle.date} • {activeArticle.readTime}</div>
              </div>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-64 object-cover rounded-2xl"
            />

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p>{activeArticle.content}</p>
              <p>
                As corporate learning platforms evolve, the integration of server-side AI model invocation, real-time audio streaming, and structured schema verification allows students to clarify ambiguities instantly without leaving their study session environment.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
