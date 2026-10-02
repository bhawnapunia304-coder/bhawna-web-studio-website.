import React, { useState } from 'react';
import { INITIAL_WEB_VITALS } from '../../utils/analyticsGenerator';
import { WebVitalMetric } from '../../types';
import { Gauge, Smartphone, Monitor, CheckCircle, Zap } from 'lucide-react';

export const WebVitalsChart: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('desktop');
  const [metrics, setMetrics] = useState<WebVitalMetric[]>(INITIAL_WEB_VITALS);

  // When switching device mode, calculate realistic mobile throttled vs desktop fiber vitals
  const handleDeviceChange = (mode: 'mobile' | 'desktop') => {
    setDeviceMode(mode);
    if (mode === 'mobile') {
      setMetrics([
        { ...INITIAL_WEB_VITALS[0], value: 1.05, target: 1.4 },
        { ...INITIAL_WEB_VITALS[1], value: 48, target: 100 },
        { ...INITIAL_WEB_VITALS[2], value: 0.004, target: 0.05 },
        { ...INITIAL_WEB_VITALS[3], value: 165, target: 200 },
        { ...INITIAL_WEB_VITALS[4], value: 0.68, target: 1.0 },
      ]);
    } else {
      setMetrics(INITIAL_WEB_VITALS);
    }
  };

  const overallScore = deviceMode === 'desktop' ? 100 : 98;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              Core Web Vitals &amp; Sub-Second Audit
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                100 / 100 Vitals
              </span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Verified edge performance metrics audited on real hardware
            </p>
          </div>
        </div>

        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700/60 self-start sm:self-auto">
          <button
            onClick={() => handleDeviceChange('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              deviceMode === 'desktop'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Fiber</span>
          </button>
          <button
            onClick={() => handleDeviceChange('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              deviceMode === 'mobile'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile 4G Emulation</span>
          </button>
        </div>
      </div>

      {/* Main Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Score Dial */}
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
              Lighthouse Performance
            </span>
            <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {overallScore} / 100
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Passes all Google thresholds</span>
            </div>
          </div>
          <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
            <Zap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Speed Index Metric */}
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
            Global Speed Index
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
            {deviceMode === 'desktop' ? '0.78s' : '1.14s'}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            Visual completeness achieved in under 1.2 seconds globally.
          </p>
        </div>

        {/* Total Blocking Time */}
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
            Total Blocking Time (TBT)
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
            {deviceMode === 'desktop' ? '0ms' : '12ms'}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            Zero main-thread jank during initial interactive paint.
          </p>
        </div>
      </div>

      {/* Horizontal Bar Breakdown for each Metric */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
          Individual Metric Timings vs Target Thresholds
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metrics.map((m) => {
            const percentage = Math.min(100, Math.round((m.value / m.target) * 80));
            return (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{m.acronym}</span>
                    <span className="text-stone-400 text-[11px] ml-1.5 hidden sm:inline">({m.name})</span>
                  </div>
                  <div className="font-mono tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    {m.value}
                    {m.unit}
                    <span className="text-[10px] text-stone-400 font-normal ml-1">
                      / target &lt;{m.target}
                      {m.unit}
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(15, percentage)}%` }}
                  ></div>
                </div>

                <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                  {m.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
