'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Send,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Lock,
} from 'lucide-react';
import { ViewMode } from './navbar';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">EduFlow LMS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Learn Smarter. Teach Better. Grow Faster. EduFlow LMS delivers enterprise-grade online education with interactive AI tutors, verified certificates, and real-time collaboration.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center text-slate-400"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center text-slate-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center text-slate-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center text-slate-400"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Public Pages */}
          <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('public-courses')}
                  className="hover:text-white transition-colors"
                >
                  Browse Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('public-pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('public-stories')}
                  className="hover:text-white transition-colors"
                >
                  Student Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('public-blog')}
                  className="hover:text-white transition-colors"
                >
                  Blog & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('public-contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Dashboards & Learning */}
          <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Dashboards</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('student-dash')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Student Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('player')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Interactive Course Player
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('instructor-dash')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Instructor Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-dash')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold tracking-wider text-xs uppercase">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400">
              Get weekly AI learning tips, top course discounts, and industry updates.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Subscribed successfully! Welcome to EduFlow.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> SOC2 Compliant. No spam ever.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 EduFlow LMS Inc. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for global learners
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC 2 Type II Certified
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" /> English (US) / USD ($)
            </span>
          </div>
        </div>
      </div>

      {/* Cookie Banner Popup */}
      {!cookieAccepted && (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-xs space-y-3 text-slate-300">
          <div className="font-medium text-white flex items-center justify-between">
            <span>🍪 Cookie & Privacy Notice</span>
            <button
              onClick={() => setCookieAccepted(true)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-400 leading-relaxed">
            We use necessary cookies to enable seamless learning sessions, course analytics, and AI assistant state.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCookieAccepted(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium"
            >
              Accept All
            </button>
            <button
              onClick={() => setCookieAccepted(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
            >
              Essential Only
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
