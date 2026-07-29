'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, ViewMode } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/public/hero';
import { CoursesSection } from '@/components/public/courses-section';
import { CategoriesSection } from '@/components/public/categories-section';
import { CourseSearchView } from '@/components/public/course-search-view';
import { CourseDetailsView } from '@/components/public/course-details-view';
import { PricingSection } from '@/components/public/pricing-section';
import { SuccessStories } from '@/components/public/success-stories';
import { BlogSection } from '@/components/public/blog-section';
import { ContactSection } from '@/components/public/contact-section';
import { CoursePlayerView } from '@/components/player/course-player-view';
import { StudentDashboard } from '@/components/dashboards/student-dashboard';
import { InstructorDashboard } from '@/components/dashboards/instructor-dashboard';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { CommandPalette } from '@/components/command-palette';
import { AIAssistantWidget } from '@/components/ai-assistant-widget';
import { CartDrawer } from '@/components/cart/cart-drawer';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewMode>('public-home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('c1'); // default Next.js 15 course
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Command palette modal
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemIds, setCartItemIds] = useState<string[]>(['c1']);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('public-course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (courseId: string) => {
    if (!cartItemIds.includes(courseId)) {
      setCartItemIds([...cartItemIds, courseId]);
    }
    setCartOpen(true);
  };

  const handleRemoveFromCart = (courseId: string) => {
    setCartItemIds(cartItemIds.filter((id) => id !== courseId));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
      {/* Global Navigation (Hidden in player mode for focus) */}
      {currentView !== 'player' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => setCommandPaletteOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          cartCount={cartItemIds.length}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: PUBLIC HOME LANDING */}
        {currentView === 'public-home' && (
          <div>
            <Hero
              onNavigate={(v) => setCurrentView(v)}
              onSearchSubmit={(query) => {
                setSearchQuery(query);
                setCurrentView('public-courses');
              }}
            />
            <CoursesSection
              onSelectCourse={handleSelectCourse}
              onNavigate={(v) => setCurrentView(v)}
              onAddToCart={handleAddToCart}
              cartItemIds={cartItemIds}
            />
            <CategoriesSection
              onNavigate={(v) => setCurrentView(v)}
              onSelectCategory={(cat) => {
                setSearchQuery(cat);
                setCurrentView('public-courses');
              }}
            />
            <PricingSection onNavigate={(v) => setCurrentView(v)} />
            <SuccessStories />
            <BlogSection />
            <ContactSection />
          </div>
        )}

        {/* VIEW 2: COURSE SEARCH ENGINE */}
        {currentView === 'public-courses' && (
          <CourseSearchView
            initialSearchQuery={searchQuery}
            onSelectCourse={handleSelectCourse}
            onAddToCart={handleAddToCart}
            cartItemIds={cartItemIds}
          />
        )}

        {/* VIEW 3: COURSE DETAILS PAGE */}
        {currentView === 'public-course-details' && (
          <CourseDetailsView
            courseId={selectedCourseId}
            onNavigate={(v) => setCurrentView(v)}
            onAddToCart={handleAddToCart}
            cartItemIds={cartItemIds}
          />
        )}

        {/* VIEW 4: PRICING PAGE */}
        {currentView === 'public-pricing' && (
          <PricingSection onNavigate={(v) => setCurrentView(v)} />
        )}

        {/* VIEW 5: INTERACTIVE COURSE PLAYER */}
        {currentView === 'player' && (
          <CoursePlayerView onNavigate={(v) => setCurrentView(v)} />
        )}

        {/* VIEW 6: STUDENT DASHBOARD */}
        {currentView === 'student-dash' && (
          <StudentDashboard
            onNavigate={(v) => setCurrentView(v)}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {/* VIEW 7: INSTRUCTOR DASHBOARD */}
        {currentView === 'instructor-dash' && <InstructorDashboard />}

        {/* VIEW 8: ADMIN DASHBOARD */}
        {currentView === 'admin-dash' && <AdminDashboard />}
      </main>

      {/* Global Command Palette Search Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCourse={handleSelectCourse}
        onSelectCategory={(catSlug) => {
          setSearchQuery(catSlug);
          setCurrentView('public-courses');
        }}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItemIds={cartItemIds}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCartItemIds([])}
      />

      {/* Floating AI Tutor Chat Widget */}
      <AIAssistantWidget />

      {/* Global Footer (Hidden in player mode) */}
      {currentView !== 'player' && (
        <Footer onNavigate={(v) => setCurrentView(v)} />
      )}
    </div>
  );
}
