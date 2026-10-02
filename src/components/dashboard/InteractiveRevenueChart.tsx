import React, { useState, useMemo } from 'react';
import { RevenueDataPoint } from '../../types';
import { TrendingUp, ArrowUpRight, Calendar, Info } from 'lucide-react';

interface InteractiveRevenueChartProps {
  data: RevenueDataPoint[];
  range: '7d' | '30d' | '90d' | '1y';
  onRangeChange: (newRange: '7d' | '30d' | '90d' | '1y') => void;
  totalRevenue: number;
  totalInquiries: number;
  avgConversion: number;
}

export const InteractiveRevenueChart: React.FC<InteractiveRevenueChartProps> = ({
  data,
  range,
  onRangeChange,
  totalRevenue,
  totalInquiries,
  avgConversion,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart dimensions
  const width = 800;
  const height = 300;
  const padding = { top: 25, right: 30, bottom: 40, left: 60 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Compute Scales
  const maxVal = useMemo(() => {
    if (!data.length) return 1000;
    const maxRev = Math.max(...data.map((d) => d.revenue));
    const maxTgt = Math.max(...data.map((d) => d.target));
    return Math.max(maxRev, maxTgt) * 1.15;
  }, [data]);

  const minVal = 0;

  // Coordinate mapping
  const points = useMemo(() => {
    if (!data.length) return [];
    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * innerWidth;
      const y = padding.top + innerHeight - ((d.revenue - minVal) / (maxVal - minVal)) * innerHeight;
      const targetY = padding.top + innerHeight - ((d.target - minVal) / (maxVal - minVal)) * innerHeight;
      return { x, y, targetY, data: d };
    });
  }, [data, innerWidth, innerHeight, padding, maxVal, minVal]);

  // Generate smooth SVG cubic bezier path
  const areaPath = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    // Close area along the bottom
    const lastX = points[points.length - 1].x;
    const bottomY = padding.top + innerHeight;
    d += ` L ${lastX} ${bottomY} L ${points[0].x} ${bottomY} Z`;
    return d;
  }, [points, padding, innerHeight]);

  const linePath = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  const targetLinePath = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].targetY}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.targetY}, ${mx} ${p1.targetY}, ${p1.x} ${p1.targetY}`;
    }
    return d;
  }, [points]);

  // Horizontal Grid Lines
  const yTicks = useMemo(() => {
    const ticks = [0, 0.25, 0.5, 0.75, 1];
    return ticks.map((t) => {
      const val = Math.round(maxVal * t);
      const y = padding.top + innerHeight - t * innerHeight;
      return { val, y };
    });
  }, [maxVal, innerHeight, padding]);

  const activePoint = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      {/* Top Controls & Metrics Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Live Interactive Visualization
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            Revenue &amp; Retainer Momentum
            <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Real-time projection calculated from current active contracts and scenario simulation inputs
          </p>
        </div>

        {/* Range Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700/60 self-start sm:self-auto">
          {(['7d', '30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all whitespace-nowrap ${
                range === r
                  ? 'bg-white dark:bg-stone-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-stone-200/80 dark:border-stone-700'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Ticker Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-0.5">
            Period Revenue
          </span>
          <div className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            ${totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18.4% vs prev
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-0.5">
            Inquiries Generated
          </span>
          <div className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {totalInquiries}
          </div>
          <span className="text-[11px] text-stone-500 dark:text-stone-400">High intent verified</span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-0.5">
            Effective Conversion
          </span>
          <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
            {avgConversion}%
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Above industry avg</span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-0.5">
            Studio Retainer Target
          </span>
          <div className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            ${Math.round(totalRevenue * 1.08).toLocaleString()}
          </div>
          <span className="text-[11px] text-stone-500 dark:text-stone-400">Quarterly milestone</span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={t.y}
                x2={width - padding.right}
                y2={t.y}
                stroke="currentColor"
                className="text-stone-200 dark:text-stone-800"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={t.y + 4}
                textAnchor="end"
                className="text-[10px] font-mono fill-stone-400 dark:fill-stone-500"
              >
                ${t.val >= 1000 ? `${Math.round(t.val / 1000)}k` : t.val}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#revenueGradient)" className="transition-all duration-300" />

          {/* Benchmark Target Dashed Line */}
          <path
            d={targetLinePath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            className="transition-all duration-300"
          />

          {/* Active Revenue Spline Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Interactive Data Nodes */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                {/* Hit target */}
                <circle cx={p.x} cy={p.y} r={16} fill="transparent" />

                {/* Visible dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* X-axis tick label */}
                <text
                  x={p.x}
                  y={height - 12}
                  textAnchor="middle"
                  className={`text-[11px] font-mono ${
                    isHovered
                      ? 'fill-indigo-600 dark:fill-indigo-400 font-semibold'
                      : 'fill-stone-500 dark:fill-stone-400'
                  }`}
                >
                  {p.data.label}
                </text>
              </g>
            );
          })}

          {/* Active vertical crosshair when hovered */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={padding.top}
              x2={activePoint.x}
              y2={padding.top + innerHeight}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="pointer-events-none"
            />
          )}
        </svg>

        {/* Dynamic Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none p-3 rounded-xl bg-stone-900/95 text-stone-100 text-xs shadow-xl border border-stone-800 -translate-x-1/2 -translate-y-full transition-transform duration-75"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100 - 4}%`,
            }}
          >
            <div className="flex items-center justify-between gap-3 pb-1 mb-1 border-b border-stone-800 font-mono text-[10px] text-stone-400">
              <span>{activePoint.data.label}</span>
              <span className="text-emerald-400">+{activePoint.data.conversionRate}% conv</span>
            </div>
            <div className="font-semibold text-white font-mono text-sm">
              ${activePoint.data.revenue.toLocaleString()}
            </div>
            <div className="flex items-center justify-between gap-4 text-[10px] text-stone-400 mt-1">
              <span>Target: ${activePoint.data.target.toLocaleString()}</span>
              <span>{activePoint.data.inquiries} inquiries</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Guide footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-indigo-600 dark:bg-indigo-400 inline-block"></span>
            <span>Realized Studio Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t border-dashed border-stone-400 inline-block"></span>
            <span>Milestone Target Trajectory</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Hover points for micro-metrics. Adjust Scenario sliders to re-calculate instantly.</span>
        </div>
      </div>
    </div>
  );
};
