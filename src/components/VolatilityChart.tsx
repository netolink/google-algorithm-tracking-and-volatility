/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useMemo } from 'react';
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
  ScriptableContext,
  Plugin
} from 'chart.js';
import { Language, NormalizedIncident, VolatilityPoint } from '../types';
import { translations } from '../translations';
import { featureCopy } from '../featureCopy';
import { stripAngleBracketLinks } from '../dataEngine';

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
  showMovingAvg?: boolean;
  selectedIncident?: NormalizedIncident | null;
  onSelectIncident?: (inc: NormalizedIncident) => void;
  onChartReady?: (chartInstance: any) => void;
}

export default function VolatilityChart({
  points,
  lang,
  showMovingAvg = true,
  selectedIncident = null,
  onSelectIncident,
  onChartReady
}: VolatilityChartProps) {
  const chartRef = useRef<any>(null);
  const t = translations[lang];
  const fc = featureCopy[lang];
  const isRtl = lang === 'he';

  useEffect(() => {
    if (onChartReady && chartRef.current) {
      onChartReady(chartRef.current);
    }
  }, [points, showMovingAvg, selectedIncident, onChartReady]);

  // Compute pixel-index bounds for the currently selected incident highlight band
  const highlightBounds = useMemo(() => {
    if (!selectedIncident || points.length === 0) return null;

    const beginDay = Date.UTC(
      selectedIncident.begin.getUTCFullYear(),
      selectedIncident.begin.getUTCMonth(),
      selectedIncident.begin.getUTCDate()
    );
    const endDateRef = selectedIncident.end ? selectedIncident.end : points[points.length - 1].date;
    const endDay = Date.UTC(
      endDateRef.getUTCFullYear(),
      endDateRef.getUTCMonth(),
      endDateRef.getUTCDate()
    );

    let startIdx = -1;
    let endIdx = -1;

    points.forEach((pt, idx) => {
      const ptDay = Date.UTC(
        pt.date.getUTCFullYear(),
        pt.date.getUTCMonth(),
        pt.date.getUTCDate()
      );
      if (ptDay >= beginDay && ptDay <= endDay) {
        if (startIdx === -1) startIdx = idx;
        endIdx = idx;
      }
    });

    if (startIdx === -1 || endIdx === -1) return null;

    return {
      startIdx,
      endIdx,
      isCore: selectedIncident.isCoreUpdate,
      title: selectedIncident.title
    };
  }, [selectedIncident, points]);

  const highlightBoundsRef = useRef(highlightBounds);
  highlightBoundsRef.current = highlightBounds;

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update('none');
    }
  }, [highlightBounds]);

  // Custom Chart.js plugin to draw the selected incident rollout band
  const highlightBandPlugin = useMemo<Plugin<'line'>>(
    () => ({
      id: 'selectedIncidentBand',
      beforeDatasetsDraw(chart) {
        const bounds = highlightBoundsRef.current;
        if (!bounds) return;
        const { ctx, chartArea, scales } = chart;
        const xScale = scales.x;
        if (!chartArea || !xScale) return;

        let xStart = xScale.getPixelForValue(bounds.startIdx);
        let xEnd = xScale.getPixelForValue(bounds.endIdx);

        if (xStart > xEnd) {
          const tmp = xStart;
          xStart = xEnd;
          xEnd = tmp;
        }

        // Ensure single-day incidents have a clean minimum visible band width
        if (Math.abs(xEnd - xStart) < 12) {
          xStart -= 6;
          xEnd += 6;
        }

        const clampedLeft = Math.max(chartArea.left, xStart);
        const clampedRight = Math.min(chartArea.right, xEnd);
        const width = Math.max(4, clampedRight - clampedLeft);

        ctx.save();
        ctx.fillStyle = bounds.isCore
          ? 'rgba(225, 29, 72, 0.08)'
          : 'rgba(79, 70, 229, 0.08)';
        ctx.fillRect(clampedLeft, chartArea.top, width, chartArea.bottom - chartArea.top);

        ctx.strokeStyle = bounds.isCore
          ? 'rgba(225, 29, 72, 0.45)'
          : 'rgba(79, 70, 229, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(clampedLeft, chartArea.top);
        ctx.lineTo(clampedLeft, chartArea.bottom);
        ctx.moveTo(clampedRight, chartArea.top);
        ctx.lineTo(clampedRight, chartArea.bottom);
        ctx.stroke();
        ctx.restore();
      }
    }),
    []
  );

  function createLineGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(0.28, '#059669');
    gradient.addColorStop(0.32, '#F59E0B');
    gradient.addColorStop(0.58, '#F97316');
    gradient.addColorStop(0.62, '#EF4444');
    gradient.addColorStop(1, '#DC2626');
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
  const movingAvgValues = points.map(p => p.movingAvg7d);

  const datasets: any[] = [
    {
      label: t.volatilityIndexLabel,
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
      pointRadius: (context: any) => {
        const idx = context.dataIndex;
        if (idx === undefined || idx < 0 || idx >= points.length) return 3;
        return points[idx].incidentCount > 0 ? 7.5 : 2.5;
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
        const val = pt.metricValue;
        if (pt.incidentCount > 0) {
          const services = pt.incidents.map(i => i.service);
          if (services.includes('Indexing')) return '#2563EB';
          return '#EF4444';
        }
        if (val > 60) return '#EF4444';
        if (val > 30) return '#F59E0B';
        return '#10B981';
      },
      pointBorderColor: '#ffffff',
      pointBorderWidth: (context: any) => {
        const idx = context.dataIndex;
        if (idx === undefined || idx < 0 || idx >= points.length) return 2;
        return points[idx].incidentCount > 0 ? 3 : 2;
      }
    }
  ];

  if (showMovingAvg) {
    datasets.push({
      label: fc.chartControls.movingAvgLabel,
      data: movingAvgValues,
      fill: false,
      tension: 0.4,
      borderWidth: 2,
      borderDash: [5, 5],
      borderColor: '#4F46E5',
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: '#4F46E5',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 1.5
    });
  }

  const data = {
    labels: chartLabels,
    datasets
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    rtl: isRtl,
    interaction: {
      mode: 'index',
      intersect: false
    },
    onHover: (event: any, elements: any[]) => {
      if (!event?.native?.target) return;
      if (elements && elements.length > 0 && onSelectIncident) {
        const idx = elements[0].index;
        const pt = points[idx];
        event.native.target.style.cursor = pt && pt.incidents.length > 0 ? 'pointer' : 'default';
      } else {
        event.native.target.style.cursor = 'default';
      }
    },
    onClick: (_event: any, elements: any[]) => {
      if (!onSelectIncident || !elements || elements.length === 0) return;
      const idx = elements[0].index;
      const pt = points[idx];
      if (pt && pt.incidents.length > 0) {
        onSelectIncident(pt.incidents[0]);
      }
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
            return pt.date.toLocaleDateString(
              lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ru-RU',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            );
          },
          label: (context: any) => {
            const pt = points[context.dataIndex];
            if (!pt) return '';

            if (context.datasetIndex === 1) {
              const maVal = pt.movingAvg7d.toFixed(1);
              return ` ${fc.chartControls.movingAvgLabel}: ${maVal}%`;
            }

            const rawMetric = pt.metricValue;
            const val = rawMetric.toFixed(1);
            let lvl = t.volatilityGuide.calm.label || t.volatilityGuide.calm.title.split(' ')[0];
            if (rawMetric > 60) {
              lvl = t.volatilityGuide.storm.label || t.volatilityGuide.storm.title.split(' ')[0];
            } else if (rawMetric > 30) {
              lvl = t.volatilityGuide.volatile.label || t.volatilityGuide.volatile.title.split(' ')[0];
            }
            const labelPrefix =
              lang === 'he' ? ' תנודתיות:' : lang === 'ru' ? ' Волатильность:' : ' Volatility:';
            return `${labelPrefix} ${val}% (${lvl})`;
          },
          afterBody: (tooltipItems: any) => {
            const idx = tooltipItems[0].dataIndex;
            const pt = points[idx];
            if (!pt || pt.incidents.length === 0) return '';

            const lines = [
              '',
              isRtl
                ? 'אירועי Google רשמיים:'
                : lang === 'ru'
                  ? 'Официальные события Google:'
                  : 'Official Google Events:'
            ];

            pt.incidents.forEach(inc => {
              const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
              const typeLabel = inc.isCoreUpdate
                ? isRtl
                  ? 'עדכון ליבה'
                  : lang === 'ru'
                    ? 'Основное обновление'
                    : 'Core Update'
                : serviceLabel;
              lines.push(`• [${typeLabel}] ${stripAngleBracketLinks(inc.description)}`);
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
          color: 'rgba(224, 226, 236, 0.7)'
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
      <Line
        ref={chartRef}
        data={data}
        options={options}
        plugins={[highlightBandPlugin]}
      />
    </div>
  );
}
