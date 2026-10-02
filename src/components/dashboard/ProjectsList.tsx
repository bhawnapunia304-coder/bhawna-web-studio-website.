import React from 'react';
import { StudioProject } from '../../types';
import { OfflineCache } from '../../services/offlineCache';
import { FolderGit2, CheckCircle2, Globe, Clock, Sparkles } from 'lucide-react';

interface ProjectsListProps {
  projects: StudioProject[];
  onProjectsUpdated: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onProjectsUpdated }) => {
  const handleProgressChange = (id: string, progress: number) => {
    OfflineCache.updateProjectProgress(id, progress);
    onProjectsUpdated();
  };

  const getStatusBadge = (status: StudioProject['status']) => {
    switch (status) {
      case 'deployed':
        return (
          <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Live on Edge
          </span>
        );
      case 'in_progress':
        return (
          <span className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
            Active Build
          </span>
        );
      case 'in_review':
        return (
          <span className="font-mono text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            Client Review
          </span>
        );
      case 'planning':
        return (
          <span className="font-mono text-[11px] text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
            Discovery
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            Active Client Builds &amp; Burndown
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {projects.length} repositories
            </span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Drag velocity sliders to update live sprint progress and sync to offline cache
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  {proj.domain}
                </span>
                {getStatusBadge(proj.status)}
              </div>

              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {proj.title}
              </h4>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Client: {proj.client} · {proj.category}
              </div>
            </div>

            {/* Interactive Progress Slider */}
            <div className="space-y-2 pt-2 border-t border-stone-200/80 dark:border-stone-750">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 dark:text-stone-400 font-medium">Sprint Velocity</span>
                <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                  {proj.progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={proj.progress}
                onChange={(e) => handleProgressChange(proj.id, Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Metrics footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400 pt-1">
              <span>Budget: ${proj.budget}</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                {proj.speedScore}/100 Speed
              </span>
              <span>Due: {proj.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
