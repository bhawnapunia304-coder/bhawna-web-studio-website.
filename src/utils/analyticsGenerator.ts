import { RevenueDataPoint, ScenarioSimulationParams, WebVitalMetric } from '../types';

export function generateRevenueData(
  range: '7d' | '30d' | '90d' | '1y',
  scenario: ScenarioSimulationParams
): { points: RevenueDataPoint[]; totalRevenue: number; totalInquiries: number; avgConversion: number } {
  const { monthlyTraffic, conversionRate, averageDealValue } = scenario;
  const baseMonthlyRevenue = monthlyTraffic * (conversionRate / 100) * averageDealValue;

  let count = 7;
  let labelFormat: 'day' | 'date' | 'month' = 'day';

  if (range === '7d') {
    count = 7;
    labelFormat = 'day';
  } else if (range === '30d') {
    count = 10; // 3-day buckets
    labelFormat = 'date';
  } else if (range === '90d') {
    count = 12; // weekly buckets
    labelFormat = 'date';
  } else {
    count = 12; // monthly
    labelFormat = 'month';
  }

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const points: RevenueDataPoint[] = [];
  let sumRevenue = 0;
  let sumInquiries = 0;

  // Scale factor depending on period length
  const periodTraffic = range === '7d' 
    ? monthlyTraffic / 4.3 
    : range === '30d' 
    ? monthlyTraffic 
    : range === '90d' 
    ? monthlyTraffic * 3 
    : monthlyTraffic * 12;

  const baselineSlice = baseMonthlyRevenue / (range === '7d' ? 4.3 * count : count);

  for (let i = 0; i < count; i++) {
    // Generate organic pseudo-random fluctuation based on curve index
    const wave = Math.sin((i / count) * Math.PI * 2) * 0.15;
    const noise = (Math.sin(i * 13.7) + 1) * 0.1 - 0.05;
    const factor = 1 + wave + noise;

    const sliceRevenue = Math.round(baselineSlice * factor);
    const sliceTarget = Math.round(baselineSlice * 1.08);
    const sliceInquiries = Math.max(1, Math.round((periodTraffic / count) * (conversionRate / 100) * (0.85 + Math.random() * 0.3)));

    let label = '';
    if (labelFormat === 'day') {
      label = daysOfWeek[i % 7];
    } else if (labelFormat === 'month') {
      label = months[i % 12];
    } else {
      label = `Wk ${i + 1}`;
    }

    sumRevenue += sliceRevenue;
    sumInquiries += sliceInquiries;

    points.push({
      date: `2026-T${i + 1}`,
      label,
      revenue: sliceRevenue,
      target: sliceTarget,
      inquiries: sliceInquiries,
      conversionRate: Math.round((conversionRate * (0.9 + noise)) * 10) / 10,
    });
  }

  const avgConversion = Math.round((conversionRate) * 10) / 10;

  return {
    points,
    totalRevenue: sumRevenue,
    totalInquiries: sumInquiries,
    avgConversion,
  };
}

export const INITIAL_WEB_VITALS: WebVitalMetric[] = [
  {
    id: 'lcp',
    name: 'Largest Contentful Paint',
    acronym: 'LCP',
    value: 0.82,
    unit: 's',
    rating: 'good',
    description: 'Measures perceived load speed when main editorial image renders.',
    target: 1.2,
  },
  {
    id: 'inp',
    name: 'Interaction to Next Paint',
    acronym: 'INP',
    value: 34,
    unit: 'ms',
    rating: 'good',
    description: 'Responsiveness to user taps, clicks, and menu triggers.',
    target: 100,
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift',
    acronym: 'CLS',
    value: 0.002,
    unit: '',
    rating: 'good',
    description: 'Visual stability ensuring zero jarring movement during load.',
    target: 0.05,
  },
  {
    id: 'ttfb',
    name: 'Time to First Byte',
    acronym: 'TTFB',
    value: 120,
    unit: 'ms',
    rating: 'good',
    description: 'Edge CDN server response latency globally.',
    target: 200,
  },
  {
    id: 'fcp',
    name: 'First Contentful Paint',
    acronym: 'FCP',
    value: 0.54,
    unit: 's',
    rating: 'good',
    description: 'First typography or visual specimen painted on screen.',
    target: 0.9,
  },
];
