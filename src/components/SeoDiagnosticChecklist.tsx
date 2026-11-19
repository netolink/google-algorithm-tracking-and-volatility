/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Check, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { featureCopy } from '../featureCopy';

interface SeoDiagnosticChecklistProps {
  hasActiveUpdate: boolean;
  lang: Language;
}

const STORAGE_KEY = 'google_tracker_seo_checklist_v1';

export default function SeoDiagnosticChecklist({
  hasActiveUpdate,
  lang
}: SeoDiagnosticChecklistProps) {
  const fc = featureCopy[lang];
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage read errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // ignore storage write errors
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    setCheckedIds([]);
  };

  const totalCount = fc.checklist.items.length;
  const completedCount = fc.checklist.items.filter(item =>
    checkedIds.includes(item.id)
  ).length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] flex flex-col gap-6"
      id="seo-checklist-section"
    >
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight">
            {fc.checklist.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {fc.checklist.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tabular-nums font-bold text-slate-700">
              {completedCount}/{totalCount} {fc.checklist.progressLabel}
            </span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={resetChecklist}
            disabled={completedCount === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {fc.checklist.resetBtn}
          </button>
        </div>
      </div>

      {/* Contextual Rollout Status Banner (all-around hairline border, no thick left bar) */}
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
          hasActiveUpdate
            ? 'bg-amber-50/60 border-amber-200 text-amber-950'
            : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
        }`}
      >
        {hasActiveUpdate ? (
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        )}
        <span className="font-medium">
          {hasActiveUpdate ? fc.checklist.activeBanner : fc.checklist.calmBanner}
        </span>
      </div>

      {/* Checklist Items */}
      <div className="divide-y divide-slate-100">
        {fc.checklist.items.map(item => {
          const isChecked = checkedIds.includes(item.id);
          const phaseLabel = fc.checklist.phases[item.phase];

          return (
            <label
              key={item.id}
              className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0 cursor-pointer group"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggleItem(item.id)}
                className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                  isChecked
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-300 group-hover:border-blue-400'
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
              </button>

              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isChecked ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    · {phaseLabel}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed transition-colors ${
                    isChecked ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
