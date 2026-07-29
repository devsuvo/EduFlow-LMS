'use client';

import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { PRICING_PLANS, FAQS } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface PricingSectionProps {
  onNavigate: (view: ViewMode) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const [annual, setAnnual] = useState(true);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Simple, Transparent Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Invest in Your Future with Flexible Plans
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Get unlimited access to 5,000+ courses, interactive AI study assistants, verified completion certificates, and hands-on coding playgrounds.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 p-1 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-4 h-4 rounded-full bg-blue-600 transition-transform ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between ${
                plan.popular
                  ? 'border-2 border-blue-600 shadow-2xl scale-105 z-10'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white font-bold text-[11px] shadow-md uppercase tracking-wider">
                  {plan.highlight || 'Most Popular'}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${price}</span>
                  <span className="text-xs text-slate-400">/ month {annual ? '(billed annually)' : ''}</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('student-dash')}
                className={`w-full mt-8 py-3 rounded-xl font-bold text-xs transition-colors shadow-md ${
                  plan.popular
                    ? 'gradient-bg text-white hover:opacity-90 shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {plan.monthlyPrice === 0 ? 'Start Free' : 'Get Started Now'}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="pt-12 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500">Everything you need to know about EduFlow subscription & certificates.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-sm text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
