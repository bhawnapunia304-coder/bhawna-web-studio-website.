/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { ShowcaseView } from './components/showcase/ShowcaseView';
import { DashboardView } from './components/dashboard/DashboardView';
import { SetupGuideModal } from './components/common/SetupGuideModal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('luminous_dark_mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('luminous_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 antialiased">
      {viewMode === 'dashboard' ? (
        <DashboardView
          onSwitchToPublic={() => setViewMode('showcase')}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      ) : (
        <ShowcaseView
          onOpenDashboard={() => setViewMode('dashboard')}
          onOpenSetupGuide={() => setIsSetupModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Global Setup Guide Dialog */}
      <SetupGuideModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />
    </div>
  );
}
