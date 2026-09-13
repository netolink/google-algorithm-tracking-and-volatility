/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext
} from 'chart.js';
import { Language, VolatilityPoint } from '../types';
import { translations } from '../translations';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VolatilityChartProps {
  points: VolatilityPoint[];
  lang: Language;
}

export default function VolatilityChart({ points, lang }: VolatilityChartProps) {
  const chartRef = useRef<any>(null);
  const t = translations[lang];
  const isRtl = lang === 'he';

  // Helpers to build dynamic luminous multi-stop gradients for executive million-dollar presentation
  function createLineGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, '#10B981');     // Radiant Emerald Green
    gradient.addColorStop(0.28, '#059669');
    gradient.addColorStop(0.32, '#F59E0B');  // Vivid Amber / Gold
    gradient.addColorStop(0.58, '#F97316');  // Electric Orange
    gradient.addColorStop(0.62, '#EF4444');  // Vibrant Crimson Red
    gradient.addColorStop(1, '#DC2626');     // High-Voltage Deep Red
    return gradient;
  }

  function createFillGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.02)');
    gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.14)');
    gradient.addColorStop(0.32, 'rgba(245, 158, 11, 0.16)');
    gradient.addColorStop(0.6, 'rgba(249, 115, 22, 0.22)');
    gradient.addColorStop(0.62, 'rgba(239, 68, 68, 0.26)');
    gradient.addColorStop(1, 'rgba(220, 38, 38, 0.38)');
    return gradient;
  }

  const chartLabels = points.map(p => p.dateStr);
  const chartValues = points.map(p => p.metricValue);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: t.title,
        data: chartValues,
        fill: true,
        tension: 0.38,
        borderWidth: 3,
        borderColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#10B981';
          return createLineGradient(ctx, chartArea);
        },
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(16, 185, 129, 0.05)';
          return createFillGradient(ctx, chartArea);
        },
        // Highlight official Google updates with pulsing luminous visual markers
        pointRadius: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 3;
          return points[idx].incidentCount > 0 ? 7.5 : 3;
        },
        pointHoverRadius: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 6;
          return points[idx].incidentCount > 0 ? 10 : 7;
        },
        pointBackgroundColor: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return '#ffffff';
          const pt = points[idx];
          if (pt.incidentCount > 0) {
            const services = pt.incidents.map(i => i.service);
            if (services.includes('Indexing')) return '#2563EB'; // Vibrant Blue
            return '#EF4444'; // Electric Red for Core update
          }
          if (pt.metricValue > 60) return '#EF4444';
          if (pt.metricValue > 30) return '#F59E0B';
          return '#10B981';
        },
        pointBorderColor: '#ffffff',
        pointBorderWidth: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 2;
          return points[idx].incidentCount > 0 ? 3 : 2;
        },
      }
    ]
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    rtl: isRtl,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        rtl: isRtl,
        textDirection: isRtl ? 'rtl' : 'ltr',
        padding: 14,
        cornerRadius: 12,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        titleColor: '#FFFFFF',
        bodyColor: '#F8FAFC',
        titleFont: {
          family: 'Google Sans, Roboto, Noto Sans Hebrew, Rubik, sans-serif',
          size: 13,
          weight: '500'
        },
        bodyFont: {
          family: 'Google Sans, Roboto, Noto Sans Hebrew, Rubik, sans-serif',
          size: 12
        },
        callbacks: {
          title: (tooltipItems: any) => {
            const idx = tooltipItems[0].dataIndex;
            const pt = points[idx];
            if (!pt) return '';
            // Return formatted date or localized string representation if needed
            return pt.date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          },
          label: (context: any) => {
            const pt = points[context.dataIndex];
            if (!pt) return '';
            const val = pt.metricValue.toFixed(1);
            let lvl = t.volatilityGuide.calm.title.split(' ')[0];
            if (pt.metricValue > 60) {
              lvl = t.volatilityGuide.storm.title.split(' ')[0];
            } else if (pt.metricValue > 30) {
              lvl = t.volatilityGuide.volatile.title.split(' ')[0];
            }
            const labelPrefix = lang === 'he' ? ' תנודתיות:' : lang === 'ru' ? ' Волатильность:' : ' Volatility:';
            return `${labelPrefix} ${val}% (${lvl})`;
          },
          afterBody: (tooltipItems: any) => {
            const idx = tooltipItems[0].dataIndex;
            const pt = points[idx];
            if (!pt || pt.incidents.length === 0) return '';
            
            const lines = [
              '',
              isRtl ? '📌 אירועי Google רשמיים:' : lang === 'ru' ? '📌 Официальные события Google:' : '📌 Official Google Events:',
            ];

            pt.incidents.forEach(inc => {
              const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
              const typeLabel = inc.isCoreUpdate 
                ? (isRtl ? 'עדכון ליבה' : lang === 'ru' ? 'Основное обновление' : 'Core Update')
                : serviceLabel;
              lines.push(`• [${typeLabel}] ${inc.description}`);
            });

            return lines.join('\n');
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Roboto Mono, monospace',
            size: 11
          },
          color: '#747775',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: lang === 'he' ? 8 : 10
        }
      },
      y: {
        min: 0,
        max: 100,
        position: isRtl ? 'right' : 'left',
        grid: {
          color: 'rgba(224, 226, 236, 0.7)',
        },
        ticks: {
          callback: (value: any) => `${value}%`,
          font: {
            family: 'Roboto Mono, monospace',
            size: 11,
            weight: '500'
          },
          color: '#444746'
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
