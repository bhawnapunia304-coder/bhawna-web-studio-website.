import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Terminal, X, ShieldCheck, WifiOff, BarChart2, Layers } from 'lucide-react';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const localHostUrl = window.location.origin;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Clone & Access Repository',
      code: 'git clone <repo-url>\ncd react-example',
      desc: 'Ensure Node.js 18+ and npm are installed on your environment.',
    },
    {
      title: '2. Install Applet Dependencies',
      code: 'npm install',
      desc: 'Installs React 19, Tailwind CSS v4, Motion, Lucide icons, and required packages.',
    },
    {
      title: '3. Run Local Development Server',
      code: 'npm run dev',
      desc: 'Starts Vite development server on port 3000 with host binding.',
    },
    {
      title: '4. Build for Production Deployment',
      code: 'npm run build\nnpm run preview',
      desc: 'Creates a hyper-optimized static production bundle inside the dist/ folder.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Setup & Quick Deployment Guide
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Localhost access link, runtime architecture, and deployment instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Active Local Host Banner */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                Active Localhost Link
              </span>
              <div className="font-mono text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-medium">
                {localHostUrl}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(localHostUrl, 99)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors shadow-xs"
              >
                {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 99 ? 'Copied' : 'Copy URL'}</span>
              </button>
              <a
                href={localHostUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <span>Launch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Architecture Feature Grid */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              Included Enterprise Systems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/50 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100 text-xs">Secure JWT Auth</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    HMAC-SHA256 browser Web Crypto cryptographic token signing, claims verification, and expiration timers.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/50 flex items-start gap-3">
                <WifiOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100 text-xs">Offline Mode & Cache</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Full local storage caching with offline mutation queue, simulation toggle, and auto-sync on reconnect.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/50 flex items-start gap-3">
                <BarChart2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100 text-xs">Real-Time Interactive Charts</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Dynamic SVG spline charts that instantly recompute based on scenario sliders and range inputs.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/50 flex items-start gap-3">
                <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100 text-xs">Dual-Mode Architecture</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Full editorial portfolio showcase paired seamlessly with an operational SaaS analytics dashboard.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Command Flow */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Deployment CLI Sequence
            </h3>
            {steps.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-900 dark:text-stone-200">{s.title}</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">{s.desc}</span>
                </div>
                <div className="relative group">
                  <pre className="p-3 rounded-lg bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto border border-stone-800">
                    {s.code}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(s.code, idx)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors opacity-90 group-hover:opacity-100"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Port: 3000 · Status: Ready for Production
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium text-xs hover:bg-stone-800 dark:hover:bg-white transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
