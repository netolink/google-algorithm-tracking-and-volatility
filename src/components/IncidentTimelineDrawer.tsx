/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { X, Clock, Calendar, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Language, NormalizedIncident } from '../types';
import { translations } from '../translations';
import { featureCopy } from '../featureCopy';

interface IncidentTimelineDrawerProps {
  incident: NormalizedIncident | null;
  allIncidents: NormalizedIncident[];
  isHighlightedOnChart: boolean;
  onToggleChartHighlight: () => void;
  onSelectIncident: (inc: NormalizedIncident) => void;
  onClose: () => void;
  lang: Language;
}

export default function IncidentTimelineDrawer({
  incident,
  allIncidents,
  isHighlightedOnChart,
  onToggleChartHighlight,
  onSelectIncident,
  onClose,
  lang
}: IncidentTimelineDrawerProps) {
  const t = translations[lang];
  const fc = featureCopy[lang];
  const isRtl = lang === 'he';
  const locale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';

  useEffect(() => {
    if (!incident) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [incident, onClose]);

  if (!incident) return null;

  const currentIdx = allIncidents.findIndex(item => item.id === incident.id);
  const prevIncident = currentIdx > 0 ? allIncidents[currentIdx - 1] : null;
  const nextIncident =
    currentIdx >= 0 && currentIdx < allIncidents.length - 1
      ? allIncidents[currentIdx + 1]
      : null;

  const days = Math.floor(incident.durationHours / 24);
  const hours = incident.durationHours % 24;
  const durationDisplay =
    days > 0
      ? `${days}${fc.drawer.daysShort} ${hours}${fc.drawer.hoursShort}`
      : `${hours}${fc.drawer.hoursShort}`;

  const formatDateTime = (d: Date) =>
    d.toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const serviceLabel = t.services[incident.service as keyof typeof t.services] || incident.service;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/35 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="incident-drawer-title"
    >
      <div
        className={`relative w-full max-w-lg bg-white h-full shadow-2xl border-slate-200 flex flex-col overflow-hidden ${
          isRtl ? 'mr-auto border-r' : 'ml-auto border-l'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-white">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-xs font-medium text-slate-500">
              {fc.drawer.title}
            </span>
            <h3
              id="incident-drawer-title"
              className="text-lg font-heading font-bold text-slate-900 leading-snug"
            >
              {incident.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="font-medium text-slate-700">{serviceLabel}</span>
              <span aria-hidden="true">·</span>
              <span
                className={`font-semibold ${
                  incident.status === 'active' ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {incident.status === 'active'
                  ? t.eventTable.statusActive
                  : t.eventTable.statusResolved}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-700">
                {fc.drawer.durationLabel}: {durationDisplay}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={fc.drawer.close}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Summary Timing & Action Bar */}
        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {fc.drawer.startLabel}
              </span>
              <span className="font-mono tabular-nums font-semibold text-slate-800">
                {formatDateTime(incident.begin)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {fc.drawer.endLabel}
              </span>
              <span className="font-mono tabular-nums font-semibold text-slate-800">
                {incident.end ? formatDateTime(incident.end) : fc.drawer.ongoingLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onToggleChartHighlight}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isHighlightedOnChart
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              {isHighlightedOnChart ? fc.drawer.highlightedOnChart : fc.drawer.highlightOnChart}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={!prevIncident}
                onClick={() => prevIncident && onSelectIncident(prevIncident)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isRtl ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
                {fc.drawer.prevIncident}
              </button>
              <button
                type="button"
                disabled={!nextIncident}
                onClick={() => nextIncident && onSelectIncident(nextIncident)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {fc.drawer.nextIncident}
                {isRtl ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Chronological Updates List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-heading font-bold text-slate-900">
              {fc.drawer.updatesTimelineTitle}
            </h4>
            <span className="text-xs font-mono tabular-nums text-slate-500">
              {incident.updates.length} {fc.drawer.updatesCount}
            </span>
          </div>

          <ol className="relative border-s border-slate-200 ms-2.5 space-y-6">
            {incident.updates
              .slice()
              .reverse()
              .map((upd, idx) => (
                <li key={`${upd.when.getTime()}-${idx}`} className="ms-5">
                  <span
                    className={`absolute -start-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      idx === 0
                        ? incident.status === 'active'
                          ? 'bg-rose-600'
                          : 'bg-emerald-600'
                        : 'bg-slate-400'
                    }`}
                  />
                  <time className="block text-xs font-mono tabular-nums font-semibold text-slate-500 mb-1">
                    {formatDateTime(upd.when)}
                  </time>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {upd.text}
                  </p>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
