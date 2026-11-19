/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, VolatilityPoint } from '../types';
import { featureCopy } from '../featureCopy';

function escapeCsvCell(val: string | number): string {
  const str = String(val ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports the active timeframe's volatility points and active incidents to a UTF-8 BOM CSV file.
 */
export function exportTimelineToCsv(
  points: VolatilityPoint[],
  timeframeDays: number,
  lang: Language
): void {
  const headers = featureCopy[lang].csvHeaders;
  const rows: string[] = [
    [
      escapeCsvCell(headers.date),
      escapeCsvCell(headers.volatility),
      escapeCsvCell(headers.movingAvg),
      escapeCsvCell(headers.incidentCount),
      escapeCsvCell(headers.incidents)
    ].join(',')
  ];

  for (const pt of points) {
    const isoDate = pt.date.toISOString().slice(0, 10);
    const incidentTitles = pt.incidents.map(inc => inc.title).join(' | ');

    rows.push(
      [
        escapeCsvCell(isoDate),
        escapeCsvCell(pt.metricValue),
        escapeCsvCell(pt.movingAvg7d),
        escapeCsvCell(pt.incidentCount),
        escapeCsvCell(incidentTitles)
      ].join(',')
    );
  }

  const csvContent = '\uFEFF' + rows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.setAttribute('download', `google-volatility-${timeframeDays}d-${stamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Composites the live Chart.js canvas onto a crisp white background with a clean title header and exports as PNG.
 */
export function exportChartToPng(
  chartInstance: any,
  title: string,
  subtitle: string,
  timeframeDays: number
): void {
  if (!chartInstance || !chartInstance.canvas) return;

  const sourceCanvas: HTMLCanvasElement = chartInstance.canvas;
  const paddingX = 32;
  const headerHeight = 64;
  const paddingBottom = 24;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = sourceCanvas.width + paddingX * 2;
  outCanvas.height = sourceCanvas.height + headerHeight + paddingBottom;

  const ctx = outCanvas.getContext('2d');
  if (!ctx) return;

  // Clean crisp white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);

  // Subtle top border accent
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, outCanvas.height - 1, outCanvas.width, 1);

  // Title & subtitle
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Google Sans", "Noto Sans Hebrew", "Rubik", sans-serif';
  ctx.fillText(title, paddingX, 34);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 13px "Roboto Mono", monospace';
  ctx.fillText(subtitle, paddingX, 54);

  // Draw the chart canvas
  ctx.drawImage(sourceCanvas, paddingX, headerHeight);

  const dataUrl = outCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = dataUrl;
  link.setAttribute('download', `google-volatility-chart-${timeframeDays}d-${stamp}.png`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
