import React, { useEffect, useRef } from 'react';
import { ProjectDetail } from '../../data/projectsData';
import { MaisonPreview } from './previews/MaisonPreview';
import { FormaPreview } from './previews/FormaPreview';
import { AtelierPreview } from './previews/AtelierPreview';
import { NovaAiPreview } from './previews/NovaAiPreview';
import { NorthOakPreview } from './previews/NorthOakPreview';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectService: (serviceName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  onSelectService,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key and keyboard navigation handler
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const handleStartProject = () => {
    onSelectService(project.serviceType);
    onClose();
    // Scroll to contact form smoothly
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderLivePreview = () => {
    switch (project.id) {
      case 'maison-27':
        return <MaisonPreview />;
      case 'forma-studio':
        return <FormaPreview />;
      case 'atelier':
        return <AtelierPreview />;
      case 'nova-ai':
        return <NovaAiPreview />;
      case 'north-and-oak':
        return <NorthOakPreview />;
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[96vh] bg-white rounded-[20px] border border-[#e2e8f0] shadow-2xl flex flex-col overflow-hidden text-[#131b2e]"
      >
        {/* Modal Top Chrome Navigation */}
        <div className="px-5 py-3.5 bg-[#f2f3ff] border-b border-[#e2e8f0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
            </div>
            <div className="h-4 w-[1px] bg-[#e2e8f0] mx-1"></div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#131b2e] truncate" id="modal-project-title">
                {project.title}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                Concept Demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Prev / Next Buttons */}
            <button
              onClick={onPrev}
              className="p-1.5 rounded-lg bg-white border border-[#e2e8f0] text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              title="Previous project (Left arrow)"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-1.5 rounded-lg bg-white border border-[#e2e8f0] text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              title="Next project (Right arrow)"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-[#e2e8f0] mx-1"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white border border-[#e2e8f0] text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Top Banner Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                {project.category} · {project.domain}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#131b2e]">
                {project.title}
              </h2>
              <p className="text-sm text-[#464554] mt-1 max-w-2xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleStartProject}
                className="h-[44px] px-5 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.3)]"
              >
                <span>Start a project like this</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://calendly.com/bhawnawebstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[44px] px-5 rounded-[10px] bg-white border border-[#e2e8f0] hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#4338ca]" />
                <span>Book a Free Call</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Preview Browser Frame */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#131b2e] flex items-center gap-1.5 font-heading">
                <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                Interactive Live Preview (Scroll &amp; Click Inside)
              </span>
              <span className="text-[11px] font-mono text-[#64748b]">
                Real-time interactive client experience
              </span>
            </div>

            <div className="rounded-[16px] border border-[#e2e8f0] shadow-sm overflow-hidden bg-white max-h-[520px] overflow-y-auto">
              {renderLivePreview()}
            </div>
          </div>

          {/* Case Study Details Grid: Problem, Solution, Features, Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Problem & Solution */}
            <div className="p-6 rounded-[20px] bg-[#faf8ff] border border-[#e2e8f0] space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                  The Problem
                </span>
                <p className="text-xs sm:text-sm text-[#464554] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e2e8f0]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4338ca] block mb-1">
                  The Solution
                </span>
                <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed font-medium">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Features & Tools */}
            <div className="p-6 rounded-[20px] bg-[#faf8ff] border border-[#e2e8f0] space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#131b2e] block mb-2">
                  Features Built
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#464554]">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#e2e8f0]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                  Tools Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#e2e8f0] text-xs font-mono text-[#131b2e]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-[#f2f3ff] border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>Use Left/Right arrows to navigate projects</span>
            <span>·</span>
            <span>Press Esc to close</span>
          </div>
          <button
            onClick={handleStartProject}
            className="text-[#4338ca] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Start a project like this</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
