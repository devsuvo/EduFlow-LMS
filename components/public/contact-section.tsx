'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  Bot,
} from 'lucide-react';

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Course Inquiry', message: '' });

  // Live Chat Simulator state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    { sender: 'agent', text: 'Hi there! 👋 Welcome to EduFlow Support. How can we assist your learning today?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Thanks for asking about "${userMsg}". An EduFlow support specialist or AI Tutor is available 24/7!`,
        },
      ]);
    }, 800);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 24/7 Enterprise Support
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          We Are Here to Help You Succeed
        </h2>
        <p className="text-slate-500 text-sm">
          Have questions about enterprise billing, custom team seats, or course access? Contact our specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Send Us a Message</h3>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Message Received!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Thank you {formData.name}. Our student support team will respond to {formData.email} within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex S."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Course Inquiry">Course & Curriculum Inquiry</option>
                  <option value="Enterprise Seats">Enterprise / Team Seats</option>
                  <option value="Billing">Billing & Subscription</option>
                  <option value="Instructor Application">Become an Instructor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help your team or learning goals?"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Live Chat */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Contact Details</h4>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Email Us</div>
                <div>support@eduflowlms.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Phone Support</div>
                <div>+1 (800) 555-EDUFLOW</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Headquarters</div>
                <div>500 Silicon Valley Way, San Francisco, CA</div>
              </div>
            </div>
          </div>

          {/* Embedded Live Chat Widget Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm">Instant Live Chat</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Online
              </span>
            </div>

            <div className="bg-slate-800 p-3 rounded-2xl h-40 overflow-y-auto space-y-2 text-xs">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask support..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-xs"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
