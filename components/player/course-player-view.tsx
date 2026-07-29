'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
  Award,
  Clock,
  Send,
  Plus,
  Trash2,
  HelpCircle,
  Code,
  Layers,
  ArrowLeft,
  X,
  Download,
  Share2,
  QrCode,
  Flame,
} from 'lucide-react';
import { COURSES, INITIAL_STUDENT_PROGRESS, Lesson } from '@/lib/lms-data';
import { ViewMode } from '../navbar';

interface CoursePlayerViewProps {
  onNavigate: (view: ViewMode) => void;
}

export function CoursePlayerView({ onNavigate }: CoursePlayerViewProps) {
  const course = COURSES[0]; // Next.js 15 course
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(
    INITIAL_STUDENT_PROGRESS.completedLessonIds
  );

  // Player controls state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Tab State: 'curriculum' | 'ai-tutor' | 'notes' | 'flashcards' | 'quiz'
  const [activeTab, setActiveTab] = useState<'curriculum' | 'ai-tutor' | 'notes' | 'flashcards' | 'quiz'>('curriculum');

  // Notes state
  const [notes, setNotes] = useState<Array<{ id: string; time: string; text: string }>>([
    { id: 'n1', time: '02:15', text: 'App Router uses server-side components by default.' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // AI Tutor inside player
  const [aiChat, setAiChat] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Hi Alex! I am watching this lesson with you. Ask me anything about App Router vs Pages Router!' },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Quiz State
  const activeModule = course.modules[activeModuleIdx] || course.modules[0];
  const activeQuiz = activeModule.quiz;
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate Modal & Celebration
  const [showCertModal, setShowCertModal] = useState(false);

  // Pomodoro Study Timer (25 min)
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);

  const currentLesson: Lesson =
    activeModule.lessons[activeLessonIdx] || activeModule.lessons[0];

  useEffect(() => {
    let timer: any;
    if (pomoActive && pomoSeconds > 0) {
      timer = setInterval(() => setPomoSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [pomoActive, pomoSeconds]);

  const formatPomoTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleMarkCompleted = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);

      // Check if all lessons are completed
      const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      if (updated.length >= totalLessonsCount) {
        // Confetti celebration!
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setShowCertModal(true);
      }
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const mins = Math.floor(currentTime / 60);
    const secs = Math.floor(currentTime % 60);
    const timestampStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    setNotes([...notes, { id: Date.now().toString(), time: timestampStr, text: newNoteText }]);
    setNewNoteText('');
  };

  const handleSendAi = async () => {
    if (!aiInput.trim()) return;
    const query = aiInput;
    setAiChat((prev) => [...prev, { sender: 'user', text: query }]);
    setAiInput('');
    setAiLoading(true);

    try {
      const res = await fetch('/app/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: `Course: ${course.title}, Module: ${activeModule.title}, Lesson: ${currentLesson.title}`,
        }),
      });
      const data = await res.json();
      setAiChat((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Server component hydration allows streaming HTML directly from edge nodes!',
        },
      ]);
    } catch (err) {
      setAiChat((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Next.js Server Actions execute purely on the server and automatically revalidate the client UI tree!',
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuizSubmit = () => {
    if (!activeQuiz) return;
    let correct = 0;
    activeQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });
    const percentage = Math.round((correct / activeQuiz.questions.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);

    if (percentage >= 70) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessonIds.length / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('public-home')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to LMS
          </button>
          <div className="hidden sm:block">
            <h1 className="font-bold text-sm text-white truncate max-w-md">{course.title}</h1>
            <div className="text-[11px] text-slate-400">
              {activeModule.title} • {currentLesson.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Pomodoro Timer Badge */}
          <div className="hidden md:flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-amber-300">{formatPomoTime(pomoSeconds)}</span>
            <button
              onClick={() => setPomoActive(!pomoActive)}
              className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
            >
              {pomoActive ? 'Pause' : 'Study'}
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-blue-400">{progressPercent}%</span>
          </div>

          <button
            onClick={() => setShowCertModal(true)}
            className="px-3 py-1.5 rounded-xl gradient-bg text-white font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
          >
            <Award className="w-4 h-4" /> Certificate
          </button>
        </div>
      </header>

      {/* Main Player & Sidebar Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Video Stage & Lesson Header */}
        <div className="lg:col-span-8 bg-black flex flex-col justify-between overflow-y-auto">
          {/* Video Container */}
          <div className="relative aspect-video bg-black flex items-center justify-center group">
            <video
              ref={videoRef}
              src={currentLesson.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-contain"
            />

            {/* Custom Control Overlay Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
              {/* Scrubber */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 accent-blue-500 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={handleTogglePlay} className="p-1 hover:text-blue-400">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>
                  <span className="font-mono text-slate-300">
                    {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} /{' '}
                    {currentLesson.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg">
                    {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          playbackSpeed === s ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
                      }
                    }}
                    className="p-1 hover:text-blue-400"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Details Banner */}
          <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                {activeModule.title}
              </div>
              <h2 className="text-xl font-bold text-white">{currentLesson.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{currentLesson.transcript}</p>
            </div>

            <button
              onClick={() => handleMarkCompleted(currentLesson.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                completedLessonIds.includes(currentLesson.id)
                  ? 'bg-emerald-950 border border-emerald-700 text-emerald-300'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedLessonIds.includes(currentLesson.id) ? 'Completed ✓' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        {/* Right Column: Tabbed Interactive Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col h-full">
          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-800 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'curriculum'
                  ? 'border-blue-500 text-white bg-slate-800/50'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1 ${
                activeTab === 'ai-tutor'
                  ? 'border-purple-500 text-purple-300 bg-slate-800/50'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Tutor
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'notes'
                  ? 'border-blue-500 text-white bg-slate-800/50'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'quiz'
                  ? 'border-amber-500 text-amber-300 bg-slate-800/50'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              Quiz
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 1. CURRICULUM TAB */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                {course.modules.map((mod, mIdx) => (
                  <div key={mod.id} className="space-y-1.5">
                    <div className="font-bold text-xs text-slate-300 uppercase tracking-wider px-1">
                      {mod.title}
                    </div>
                    <div className="space-y-1">
                      {mod.lessons.map((les, lIdx) => {
                        const isCurrent = mIdx === activeModuleIdx && lIdx === activeLessonIdx;
                        const isDone = completedLessonIds.includes(les.id);

                        return (
                          <div
                            key={les.id}
                            onClick={() => {
                              setActiveModuleIdx(mIdx);
                              setActiveLessonIdx(lIdx);
                            }}
                            className={`p-3 rounded-xl text-xs flex items-center justify-between cursor-pointer border transition-colors ${
                              isCurrent
                                ? 'bg-blue-950/80 border-blue-600 text-white'
                                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              )}
                              <span className="truncate font-medium">{les.title}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-2">
                              {les.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. AI TUTOR TAB */}
            {activeTab === 'ai-tutor' && (
              <div className="flex flex-col h-full justify-between space-y-4 text-xs">
                <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                  {aiChat.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl whitespace-pre-wrap ${
                        m.sender === 'user'
                          ? 'bg-blue-600 text-white ml-auto max-w-[85%]'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 max-w-[90%]'
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                  {aiLoading && <div className="text-slate-400 animate-pulse">EduFlow AI is analyzing lesson...</div>}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
                    placeholder="Ask about this video..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={handleSendAi}
                    className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="font-semibold text-slate-300">Add Timestamped Note</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                      placeholder="Write your note..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-3 py-2 bg-blue-600 rounded-xl text-white font-bold shrink-0"
                    >
                      + Note
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {notes.map((n) => (
                    <div key={n.id} className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono font-bold">
                        <span>@{n.time}</span>
                        <button
                          onClick={() => setNotes(notes.filter((item) => item.id !== n.id))}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-slate-200">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. QUIZ TAB */}
            {activeTab === 'quiz' && (
              <div className="space-y-4 text-xs">
                {activeQuiz ? (
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-white">{activeQuiz.title}</h3>

                    {activeQuiz.questions.map((q, qIdx) => (
                      <div key={q.id} className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                        <div className="font-semibold text-slate-200">
                          {qIdx + 1}. {q.question}
                        </div>
                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                              className={`w-full p-2 rounded-xl text-left transition-colors border ${
                                quizAnswers[q.id] === oIdx
                                  ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleQuizSubmit}
                      className="w-full py-2.5 rounded-xl gradient-bg text-white font-bold shadow-md"
                    >
                      Submit Quiz Answers
                    </button>

                    {quizSubmitted && quizScore !== null && (
                      <div
                        className={`p-4 rounded-xl border text-center font-bold text-sm ${
                          quizScore >= 70
                            ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                            : 'bg-amber-950 border-amber-800 text-amber-300'
                        }`}
                      >
                        You Scored {quizScore}%! {quizScore >= 70 ? 'Passed ✓' : 'Review module and retry.'}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    No quiz attached to this module.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verified Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 text-center relative">
            <button
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 bg-slate-950 rounded-2xl border-2 border-dashed border-blue-500/40 space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-400 font-bold tracking-widest text-xs uppercase">
                <Award className="w-5 h-5 text-amber-400" /> EduFlow Verified Certification
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Certificate of Achievement</h2>
              <p className="text-xs text-slate-400">This verifies that student</p>
              <div className="text-xl font-extrabold text-blue-400">Alex Student</div>
              <p className="text-xs text-slate-400">has mastered all coursework and quizzes for</p>
              <div className="font-bold text-sm text-slate-100 max-w-md mx-auto">&quot;{course.title}&quot;</div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-800">
                <div>Verification ID: EDU-2026-948271</div>
                <div className="flex items-center gap-1">
                  <QrCode className="w-4 h-4 text-slate-400" /> Public Verification
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Certificate (PDF)
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
