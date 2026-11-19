/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HistoricalInsights, Language } from '../types';
import { featureCopy } from '../featureCopy';

interface HistoricalInsightsPanelProps {
  insights: HistoricalInsights;
  lang: Language;
}

export default function HistoricalInsightsPanel({
  insights,
  lang
}: HistoricalInsightsPanelProps) {
  const fc = featureCopy[lang];
  const locale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';

  const maxMonthlyTotal = Math.max(
    1,
    ...insights.monthlyDistribution.map(bucket => bucket.total)
  );

  return (
    <section
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] flex flex-col gap-6"
      id="historical-insights"
    >
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-5">
        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight">
          {fc.insights.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          {fc.insights.subtitle}
        </p>
      </div>

      {/* 4 Key Benchmark Metrics separated cleanly by whitespace & hairline dividers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-slate-100">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">
            {fc.insights.avgCoreDuration}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {insights.avgCoreDurationDays !== null
              ? `${insights.avgCoreDurationDays} ${fc.insights.daysUnit}`
              : fc.insights.noCompletedData}
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {insights.totalCoreUpdates} {fc.insights.legendCore}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">
            {fc.insights.avgSpamDuration}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {insights.avgSpamDurationDays !== null
              ? `${insights.avgSpamDurationDays} ${fc.insights.daysUnit}`
              : fc.insights.noCompletedData}
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {insights.totalSpamUpdates} {fc.insights.legendSpam}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">
            {fc.insights.avgCadence}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {insights.avgDaysBetweenUpdates !== null
              ? `${insights.avgDaysBetweenUpdates} ${fc.insights.daysUnit}`
              : fc.insights.noCompletedData}
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {insights.totalSystemIncidents} {fc.insights.legendSystem}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">
            {fc.insights.daysSinceLast}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-blue-600">
            {insights.daysSinceLastUpdate !== null
              ? `${insights.daysSinceLastUpdate} ${fc.insights.daysUnit}`
              : fc.insights.noCompletedData}
          </span>
          {insights.latestAlgoUpdateTitle && (
            <span
              className="text-xs text-slate-600 truncate"
              title={insights.latestAlgoUpdateTitle}
            >
              {insights.latestAlgoUpdateTitle}
            </span>
          )}
        </div>
      </div>

      {/* 12-Month Activity Distribution */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-700">
            {fc.insights.monthlyTitle}
          </span>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-rose-500" />
              <span>{fc.insights.legendCore}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-amber-500" />
              <span>{fc.insights.legendSpam}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-blue-500" />
              <span>{fc.insights.legendSystem}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-3 items-end pt-2">
          {insights.monthlyDistribution.map(bucket => {
            const monthLabel = bucket.date.toLocaleDateString(locale, {
              month: 'short'
            });
            const barHeightPct =
              bucket.total > 0 ? Math.max(18, Math.round((bucket.total / maxMonthlyTotal) * 100)) : 6;
            const tooltipText = `${monthLabel}: ${
              bucket.total === 0
                ? fc.insights.noIncidentsMonth
                : `${bucket.coreCount} ${fc.insights.legendCore}, ${bucket.spamCount} ${fc.insights.legendSpam}, ${bucket.systemCount} ${fc.insights.legendSystem}`
            }`;

            return (
              <div
                key={bucket.monthKey}
                className="flex flex-col items-center gap-1.5 group"
                title={tooltipText}
              >
                <span className="text-[11px] font-mono tabular-nums font-semibold text-slate-500 h-4">
                  {bucket.total > 0 ? bucket.total : ''}
                </span>
                <div className="w-full h-24 bg-slate-100/80 rounded-lg flex flex-col justify-end overflow-hidden p-1">
                  {bucket.total === 0 ? (
                    <div className="w-full h-1 rounded-xs bg-slate-200" />
                  ) : (
                    <div
                      className="w-full flex flex-col justify-end rounded-sm overflow-hidden transition-all duration-300"
                      style={{ height: `${barHeightPct}%` }}
                    >
                      {bucket.coreCount > 0 && (
                        <div
                          className="w-full bg-rose-500"
                          style={{
                            height: `${(bucket.coreCount / bucket.total) * 100}%`
                          }}
                        />
                      )}
                      {bucket.spamCount > 0 && (
                        <div
                          className="w-full bg-amber-500"
                          style={{
                            height: `${(bucket.spamCount / bucket.total) * 100}%`
                          }}
                        />
                      )}
                      {bucket.systemCount > 0 && (
                        <div
                          className="w-full bg-blue-500"
                          style={{
                            height: `${(bucket.systemCount / bucket.total) * 100}%`
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-full">
                  {monthLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
