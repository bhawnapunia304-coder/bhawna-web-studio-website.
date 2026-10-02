import React from 'react';
import { ScenarioSimulationParams } from '../../types';
import { Sliders, RotateCcw, Sparkles, DollarSign, Users, Target, Zap } from 'lucide-react';
import { DEFAULT_SCENARIO } from '../../services/offlineCache';

interface ScenarioSimulatorProps {
  scenario: ScenarioSimulationParams;
  onChange: (updated: ScenarioSimulationParams) => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ scenario, onChange }) => {
  const { monthlyTraffic, conversionRate, averageDealValue, retentionMonths } = scenario;

  const projectedMonthly = Math.round(monthlyTraffic * (conversionRate / 100) * averageDealValue);
  const projectedAnnual = projectedMonthly * 12;
  const estimatedDeals = Math.round(monthlyTraffic * (conversionRate / 100));
  const ltv = averageDealValue * (1 + retentionMonths * 0.15);

  const applyPreset = (preset: 'boutique' | 'agency' | 'enterprise') => {
    if (preset === 'boutique') {
      onChange({
        monthlyTraffic: 8500,
        conversionRate: 2.8,
        averageDealValue: 450,
        retentionMonths: 4,
      });
    } else if (preset === 'agency') {
      onChange({
        monthlyTraffic: 24000,
        conversionRate: 3.5,
        averageDealValue: 850,
        retentionMonths: 8,
      });
    } else {
      onChange({
        monthlyTraffic: 65000,
        conversionRate: 4.2,
        averageDealValue: 1800,
        retentionMonths: 14,
      });
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              Interactive Scenario Modeler
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Live Chart Input
              </span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Drag parameters to model revenue expansion and stream dynamic updates into the charts
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => applyPreset('boutique')}
            className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            Boutique
          </button>
          <button
            onClick={() => applyPreset('agency')}
            className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            Agency
          </button>
          <button
            onClick={() => applyPreset('enterprise')}
            className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            AI Suite
          </button>
          <button
            onClick={() => onChange(DEFAULT_SCENARIO)}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors ml-1"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1: Traffic */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              Monthly Targeted Traffic
            </span>
            <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
              {monthlyTraffic.toLocaleString()} visitors
            </span>
          </div>
          <input
            type="range"
            min="3000"
            max="100000"
            step="1000"
            value={monthlyTraffic}
            onChange={(e) => onChange({ ...scenario, monthlyTraffic: Number(e.target.value) })}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>3k min</span>
            <span>50k mid</span>
            <span>100k scale</span>
          </div>
        </div>

        {/* Slider 2: Conversion Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-stone-400" />
              Lead Conversion Rate
            </span>
            <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
              {conversionRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="8.0"
            step="0.1"
            value={conversionRate}
            onChange={(e) => onChange({ ...scenario, conversionRate: Number(e.target.value) })}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>0.5% (cold)</span>
            <span>3.5% (editorial avg)</span>
            <span>8.0% (high-intent)</span>
          </div>
        </div>

        {/* Slider 3: Deal Value */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-stone-400" />
              Average Project / Retainer Size
            </span>
            <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
              ${averageDealValue.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="299"
            max="3500"
            step="50"
            value={averageDealValue}
            onChange={(e) => onChange({ ...scenario, averageDealValue: Number(e.target.value) })}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>$299 (starter)</span>
            <span>$1,199 (premium)</span>
            <span>$3,500+ (custom)</span>
          </div>
        </div>

        {/* Slider 4: Care Plan Retention */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-stone-400" />
              Studio Care Plan Lifetime
            </span>
            <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
              {retentionMonths} months
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            value={retentionMonths}
            onChange={(e) => onChange({ ...scenario, retentionMonths: Number(e.target.value) })}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>1 mo</span>
            <span>12 mo</span>
            <span>24 mo</span>
          </div>
        </div>
      </div>

      {/* Real-Time Computed Projections */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
            Projected Monthly Run
          </span>
          <div className="text-base font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            ${projectedMonthly.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
            Projected Annualized (ARR)
          </span>
          <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            ${projectedAnnual.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
            Deals Closed / Month
          </span>
          <div className="text-base font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {estimatedDeals} projects
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
            Estimated LTV Per Client
          </span>
          <div className="text-base font-semibold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
            ${Math.round(ltv).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
