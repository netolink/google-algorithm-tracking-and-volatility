/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldAlert,
  Info,
  TrendingUp,
  Zap,
  SlidersHorizontal,
  Radio,
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';
import { Language, NormalizedIncident, VolatilityPoint } from './types';
import { translations } from './translations';
import { fetchGoogleIncidents, compileTimeline } from './dataEngine';
import VolatilityChart from './components/VolatilityChart';

const getInitialLanguage = (): Language => {
  try {
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const l = params.get('lang')?.toLowerCase();
      if (l === 'he' || l === 'ru' || l === 'en') return l;
    }
  } catch {
    // fallback
  }
  return 'en';
};

export default function App() {
  const [lang] = useState<Language>(getInitialLanguage);
  const [timeframe, setTimeframe] = useState<30 | 90 | 365>(90);
  const [apiState, setApiState] = useState<'loading' | 'direct' | 'synced' | 'usingLocal'>('loading');
  const [incidents, setIncidents] = useState<NormalizedIncident[]>([]);
  const [timeline, setTimeline] = useState<VolatilityPoint[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});
  const [incidentFilter, setIncidentFilter] = useState<'all' | 'core' | 'system'>('all');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');

  // Update dynamic sync timestamp helper
  const updateSyncTimestamp = () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    setLastUpdatedTime(`${utcHours}:${utcMinutes} UTC`);
  };

  // Load and process data from official Google Search Status API or GitHub Actions static feed
  const loadData = async (forceLang?: Language) => {
    const currentLang = forceLang || lang;
    try {
      const data = await fetchGoogleIncidents(currentLang, setApiState);
      setIncidents(data);
      updateSyncTimestamp();
    } catch (err) {
      console.error('Failed to resolve Google Algorithm data streams:', err);
      setApiState('usingLocal');
      updateSyncTimestamp();
    }
  };

  useEffect(() => {
    loadData();
  }, [lang]);

  // Sync timeline on changes to timeframe or incidents
  useEffect(() => {
    const baseDate = new Date();
    const points = compileTimeline(timeframe, incidents, baseDate);
    setTimeline(points);
  }, [timeframe, incidents]);

  // Synchronize dynamic DOM elements for LTR/RTL support
  useEffect(() => {
    const isRtl = lang === 'he';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const isRtl = lang === 'he';

  // Calculations for analytical Overview HUD cards
  const activeTimeline = timeline;
  const lastPoint = activeTimeline[activeTimeline.length - 1];
  const currentVolatility = lastPoint ? lastPoint.metricValue : 0;

  // Average volatility calculation
  const totalVolatility = activeTimeline.reduce((acc, curr) => acc + curr.metricValue, 0);
  const avgVolatility = activeTimeline.length > 0 ? (totalVolatility / activeTimeline.length) : 0;

  // Maximum Volatility point search
  const maxPoint = activeTimeline.reduce((prev, current) => {
    return (prev.metricValue > current.metricValue) ? prev : current;
  }, { metricValue: 0, date: new Date() });

  // Incidents filtered by the active timeframe
  const activeTimeframeIncidents = incidents.filter(inc => {
    const timeframeDaysAgo = new Date();
    timeframeDaysAgo.setDate(timeframeDaysAgo.getDate() - timeframe);
    return new Date(inc.begin) >= timeframeDaysAgo;
  });

  const coreUpdatesCount = activeTimeframeIncidents.filter(i => i.isCoreUpdate).length;
  const standardIncidentsCount = activeTimeframeIncidents.filter(i => !i.isCoreUpdate).length;

  // Filtered incidents for table
  const displayedIncidents = activeTimeframeIncidents.filter(inc => {
    if (incidentFilter === 'core') return inc.isCoreUpdate;
    if (incidentFilter === 'system') return !inc.isCoreUpdate;
    return true;
  });

  // Determine Overall Status characteristics based on current volatility score
  const getVolatilityLevel = (val: number) => {
    if (val > 60) return {
      statusKey: 'storm',
      color: 'red',
      title: t.volatilityGuide.storm.title.split(' ')[0],
      bg: 'bg-gradient-to-r from-rose-500/15 via-red-500/10 to-rose-500/5 border border-rose-400/40 text-rose-700 shadow-xs shadow-rose-500/10',
      fill: 'bg-gradient-to-r from-rose-500 to-red-600',
      badge: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-600/30',
      textColor: 'text-rose-600',
      strokeColor: '#EF4444',
      bannerBorder: 'border-rose-200/90',
      bannerGradient: 'from-white via-rose-50/40 to-red-50/20',
      glowColor: 'bg-rose-500/10',
      desc: t.liveStatus.stormDesc
    };
    if (val > 30) return {
      statusKey: 'volatile',
      color: 'yellow',
      title: t.volatilityGuide.volatile.title.split(' ')[0],
      bg: 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-400/40 text-amber-800 shadow-xs shadow-amber-500/10',
      fill: 'bg-gradient-to-r from-amber-500 to-orange-500',
      badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
      textColor: 'text-amber-600',
      strokeColor: '#F59E0B',
      bannerBorder: 'border-amber-200/90',
      bannerGradient: 'from-white via-amber-50/40 to-yellow-50/20',
      glowColor: 'bg-amber-500/10',
      desc: t.liveStatus.volatileDesc
    };
    return {
      statusKey: 'calm',
      color: 'green',
      title: t.volatilityGuide.calm.title.split(' ')[0],
      bg: 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/5 border border-emerald-400/40 text-emerald-800 shadow-xs shadow-emerald-500/10',
      fill: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      badge: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30',
      textColor: 'text-emerald-600',
      strokeColor: '#10B981',
      bannerBorder: 'border-emerald-200/90',
      bannerGradient: 'from-white via-emerald-50/40 to-teal-50/20',
      glowColor: 'bg-emerald-500/10',
      desc: t.liveStatus.calmDesc
    };
  };

  const statusObj = getVolatilityLevel(currentVolatility);

  const toggleFaq = (key: string) => {
    setExpandedFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Circular gauge calculations
  const gaugeRadius = 42;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeOffset = gaugeCircumference - (Math.min(100, Math.max(0, currentVolatility)) / 100) * gaugeCircumference;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-hidden">
      
      {/* Radiant ambient glow at top for million-dollar software depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.12),rgba(255,255,255,0))] pointer-events-none z-0"></div>

      {/* Top Glassmorphic Executive Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Google Logo / Brand Symbol & Title Block */}
            <div className="flex items-center gap-3">
              {/* Google 4-Color Radar Icon Badge with glowing drop shadow */}
              <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-md shadow-slate-200/60 relative group hover:border-blue-400 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M22 12C22 6.48 17.52 2 12 2" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M2 12C2 17.52 6.48 22 12 22" stroke="#FBBC04" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M12 22C17.52 22 22 17.52 22 12" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3.5" fill="#4285F4"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h1 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight leading-tight">
                    {t.title}
                  </h1>
                  <span className="text-xs text-slate-500 font-medium">
                    by{' '}
                    <a
                      href="https://netolink.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      Netolink
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Bar - Hyper-polished Live Data Status Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs shadow-emerald-500/10 shrink-0 select-none">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm shadow-emerald-500"></span>
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
                  {lang === 'he' ? 'נתונים חיים' : lang === 'ru' ? 'Живые данные' : 'Live Data'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Core Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 relative z-10">
        
        {/* Dynamic Executive Status Command Banner */}
        <section className={`p-6 sm:p-8 rounded-3xl border ${statusObj.bannerBorder} bg-gradient-to-br ${statusObj.bannerGradient} shadow-[0_12px_36px_-10px_rgba(15,23,42,0.08)] transition-all relative overflow-hidden`}>
          
          {/* Ambient Glow Orb */}
          <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none ${statusObj.glowColor}`}></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col gap-3.5 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide ${statusObj.bg}`}>
                  ● {t.liveStatus.title}
                </span>
                <span className="text-xs text-slate-500 font-mono font-semibold tracking-wider uppercase">
                  {lang === 'he' ? 'חיישן תנודות SERP' : lang === 'ru' ? 'РАДАР ВОЛАТИЛЬНОСТИ SERP' : 'SERP VOLATILITY SENSOR'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight text-slate-900 flex flex-wrap items-center gap-3">
                <span className={statusObj.textColor}>{statusObj.title}</span>
                <span className="text-slate-300 font-light">/</span>
                <span className="text-slate-900 font-mono font-bold">{currentVolatility}%</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                {statusObj.desc}
              </p>

              {/* Status Assist Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200/90 shadow-2xs">
                  <Radio className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                  {lang === 'he' ? 'אלגוריתם: ניטור פעיל' : lang === 'ru' ? 'Алгоритм: Активный мониторинг' : 'Algorithm: Live Monitoring'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200/90 shadow-2xs">
                  <ShieldAlert className="h-3.5 w-3.5 text-blue-600" />
                  {coreUpdatesCount} {lang === 'he' ? 'עדכוני ליבה שזוהו' : lang === 'ru' ? 'обновлений ядра' : 'Core Updates Detected'}
                </span>
              </div>
            </div>

            {/* Circular Gauge Instrument Widget */}
            <div className="flex items-center justify-center sm:justify-end shrink-0">
              <div className="relative flex flex-col items-center justify-center p-5 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl shadow-lg shadow-slate-200/50 min-w-[170px]">
                
                {/* SVG Gauge */}
                <div className="relative flex items-center justify-center h-26 w-26">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r={gaugeRadius}
                      className="stroke-slate-100"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={gaugeRadius}
                      stroke={statusObj.strokeColor}
                      strokeWidth="9"
                      strokeDasharray={gaugeCircumference}
                      strokeDashoffset={gaugeOffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: `drop-shadow(0 0 4px ${statusObj.strokeColor}80)` }}
                    />
                  </svg>
                  
                  {/* Metric in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-mono text-slate-900">
                      {currentVolatility}%
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      INDEX
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold text-slate-700 mt-2.5 tracking-wider uppercase">
                  {lang === 'he' ? 'מדד תנודתיות חי' : lang === 'ru' ? 'ИНДЕКС ВОЛАТИЛЬНОСТИ' : 'LIVE VOLATILITY'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistical Overview Hud Cards with Vibrant Accents */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="stats-hud">
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-blue-300 hover:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-sans text-slate-500 font-bold uppercase tracking-wider">
                {lang === 'he' ? 'ממוצע תנודתיות' : lang === 'ru' ? 'СРЕДНЯЯ ВОЛАТИЛЬНОСТЬ' : 'Average Volatility'}
              </span>
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight block">
                {avgVolatility.toFixed(1)}%
              </span>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-xs shadow-blue-500/30" 
                  style={{ width: `${Math.min(100, avgVolatility)}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-amber-300 hover:shadow-[0_12px_28px_-6px_rgba(245,158,11,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-sans text-slate-500 font-bold uppercase tracking-wider">
                {lang === 'he' ? 'שיא תנודתיות' : lang === 'ru' ? 'ПИКОВАЯ ВОЛАТИЛЬНОСТЬ' : 'Peak Volatility'}
              </span>
              <div className={`p-2.5 rounded-2xl ${
                maxPoint.metricValue > 60 
                  ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/25' 
                  : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25'
              }`}>
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {maxPoint.metricValue}%
                </span>
                <span className="text-[11px] font-mono text-amber-900 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  {maxPoint.date instanceof Date ? maxPoint.date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ru-RU', { month: 'short', day: 'numeric' }) : ''}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div 
                  className={`h-full rounded-full transition-all duration-500 shadow-xs ${
                    maxPoint.metricValue > 60 
                      ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/30' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30'
                  }`} 
                  style={{ width: `${Math.min(100, maxPoint.metricValue)}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-rose-300 hover:shadow-[0_12px_28px_-6px_rgba(239,68,68,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-sans text-slate-500 font-bold uppercase tracking-wider">
                {lang === 'he' ? 'עדכוני ליבה רשמיים' : lang === 'ru' ? 'ОСНОВНЫЕ ОБНОВЛЕНИЯ' : 'Core Algorithmic Updates'}
              </span>
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/25">
                <ShieldAlert className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight block">
                {coreUpdatesCount} <span className="text-xs font-sans font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">{isRtl ? 'עדכונים' : lang === 'ru' ? 'обновлений' : 'updates'}</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">
                {lang === 'he' ? 'מתוך לוח הבקרה הרשמי של Google' : lang === 'ru' ? 'По данным Google Search Status' : 'From official status dashboard'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-emerald-300 hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-sans text-slate-500 font-bold uppercase tracking-wider">
                {lang === 'he' ? 'תקלות מערכת ותשתית' : lang === 'ru' ? 'ТЕХНИЧЕСКИЕ СБОИ' : 'System Incidents'}
              </span>
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight block">
                {standardIncidentsCount} <span className="text-xs font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{isRtl ? 'תקלות' : lang === 'ru' ? 'инцидентов' : 'alerts'}</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">
                {lang === 'he' ? 'שירותי דירוג, אינדוקס, סריקה והגשה' : lang === 'ru' ? 'Индексация, сканирование и выдача' : 'Serving, Indexing & Crawling'}
              </p>
            </div>
          </div>

        </section>

        {/* Dynamic Chart Dashboard Display */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] flex flex-col gap-6" id="chart-section">
          
          {/* Chart Header with Timeframe filters and Legend */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight">
                  {lang === 'he' ? 'מגמת תנודתיות בתוצאות החיפוש (SERP)' : lang === 'ru' ? 'Динамика волатильности выдачи (SERP)' : 'Volatility Index Trend'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                  {timeframe}D
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium select-none">
                {lang === 'he' ? 'מעקב רציף אחר תנודתיות השוק בהצלבה עם אירועים רשמיים של Google' : lang === 'ru' ? 'Непрерывное отслеживание волатильности в сопоставлении с официальными событиями Google' : 'Continuous market volatility tracked against official Google incidents'}
              </p>
            </div>

            {/* Custom Vibrant Chart Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 select-none font-medium">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-800">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
                <span>{t.volatilityGuide.calm.title.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-800">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-xs shadow-amber-500/50"></span>
                <span>{t.volatilityGuide.volatile.title.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50/80 border border-rose-200/60 text-rose-800">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500/50"></span>
                <span>{t.volatilityGuide.storm.title.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50/80 border border-red-200 text-red-700 font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-white shadow-xs shadow-red-600/50"></span>
                <span>{lang === 'he' ? 'עדכון רשמי של Google' : lang === 'ru' ? 'Обновление Google' : 'Google Update'}</span>
              </span>
            </div>

            {/* Timeframe selector controls */}
            <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 self-start lg:self-auto shadow-inner">
              <button
                onClick={() => setTimeframe(30)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                  timeframe === 30 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
                id="btn-timeframe-30"
              >
                {t.timeframes.thirtyDays}
              </button>
              <button
                onClick={() => setTimeframe(90)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                  timeframe === 90 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
                id="btn-timeframe-90"
              >
                {t.timeframes.ninetyDays}
              </button>
              <button
                onClick={() => setTimeframe(365)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                  timeframe === 365 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
                id="btn-timeframe-365"
              >
                {t.timeframes.year}
              </button>
            </div>
          </div>

          {/* Actual Line Graph Canvas Container */}
          <div className="w-full h-[320px] sm:h-[400px]">
            <VolatilityChart points={timeline} lang={lang} />
          </div>

        </section>

        {/* Reference Levels Cards */}
        <section className="flex flex-col gap-3">
          <div className="flex flex-col mb-1 select-none">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
              {t.volatilityGuide.title}
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              {t.volatilityGuide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="reference-guide">
            
            <div className="p-5 bg-gradient-to-br from-emerald-50/50 via-white to-white border border-emerald-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(16,185,129,0.08)] hover:border-emerald-300 hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300/80 px-3 py-0.5 rounded-full shadow-2xs">
                  {t.volatilityGuide.calm.title}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200/60">{t.volatilityGuide.calm.range}</span>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {t.volatilityGuide.calm.desc}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-50/50 via-white to-white border border-amber-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(245,158,11,0.08)] hover:border-amber-300 hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-amber-100/80 border border-amber-300/80 px-3 py-0.5 rounded-full shadow-2xs">
                  {t.volatilityGuide.volatile.title}
                </span>
                <span className="text-xs font-mono font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200/60">{t.volatilityGuide.volatile.range}</span>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {t.volatilityGuide.volatile.desc}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-rose-50/50 via-white to-white border border-rose-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(239,68,68,0.08)] hover:border-rose-300 hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 bg-rose-100/80 border border-rose-300/80 px-3 py-0.5 rounded-full shadow-2xs">
                  {t.volatilityGuide.storm.title}
                </span>
                <span className="text-xs font-mono font-bold text-rose-700 bg-white/80 px-2 py-0.5 rounded-md border border-rose-200/60">{t.volatilityGuide.storm.range}</span>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {t.volatilityGuide.storm.desc}
              </p>
            </div>

          </div>
        </section>

        {/* Official Incident Log Data Grid Table */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] flex flex-col gap-6" id="log-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight">
                {t.eventTable.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t.eventTable.subtitle}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 self-start sm:self-auto text-xs font-semibold shadow-inner">
              <button
                type="button"
                onClick={() => setIncidentFilter('all')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  incidentFilter === 'all' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {lang === 'he' ? 'כל האירועים' : lang === 'ru' ? 'Все события' : 'All'} ({activeTimeframeIncidents.length})
              </button>
              <button
                type="button"
                onClick={() => setIncidentFilter('core')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  incidentFilter === 'core' ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {lang === 'he' ? 'עדכוני ליבה' : lang === 'ru' ? 'Обновления ядра' : 'Core Updates'} ({coreUpdatesCount})
              </button>
              <button
                type="button"
                onClick={() => setIncidentFilter('system')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  incidentFilter === 'system' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {lang === 'he' ? 'תקלות מערכת' : lang === 'ru' ? 'Системные сбои' : 'System Issues'} ({standardIncidentsCount})
              </button>
            </div>
          </div>

          {displayedIncidents.length === 0 ? (
            <div className="py-14 flex flex-col items-center justify-center text-center px-4 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle className="h-9 w-9 text-emerald-500 mb-3 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-md">
                {t.eventTable.noEvents}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200/90 rounded-2xl bg-white shadow-xs">
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/90 border-b border-slate-200/80 select-none font-bold">
                    <tr>
                      <th scope="col" className="px-5 py-4 w-[190px]">{t.eventTable.colDate}</th>
                      <th scope="col" className="px-5 py-4">{t.eventTable.colEvent}</th>
                      <th scope="col" className="px-5 py-4 w-[150px]">{t.eventTable.colType}</th>
                      <th scope="col" className="px-5 py-4 w-[130px]">{t.eventTable.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {displayedIncidents.map((inc) => {
                      const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
                      const currentLocale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';
                      const dateRangeStr = inc.end
                        ? `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })} - ${new Date(inc.end).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })} - ${lang === 'he' ? 'פעיל כעת' : lang === 'ru' ? 'Активно' : 'Active'}`;

                      return (
                        <tr key={inc.id} className="hover:bg-blue-50/20 transition-colors">
                          <td className="px-5 py-4 whitespace-nowrap text-xs font-mono text-slate-600 font-bold">
                            {dateRangeStr}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900 block font-heading text-sm">
                                {inc.isCoreUpdate 
                                  ? (lang === 'he' ? 'עדכון אלגוריתם רשמי של Google' : lang === 'ru' ? 'Официальное обновление алгоритма Google' : 'Google Algorithmic Update') 
                                  : serviceLabel}
                              </span>
                              <span className="text-slate-500 text-xs leading-relaxed max-w-2xl block font-normal">
                                {inc.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs font-mono">
                            <span className={`px-3 py-1 rounded-full font-bold select-none text-[11px] shadow-2xs ${
                              inc.service === 'Ranking' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                              inc.service === 'Indexing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              inc.service === 'Serving' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                              'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {serviceLabel}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs">
                            <span className={`inline-flex items-center gap-2 font-bold ${
                              inc.status === 'active' ? 'text-rose-600' : 'text-emerald-700'
                            }`}>
                              <span className={`h-2 w-2 rounded-full ${inc.status === 'active' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 shadow-xs shadow-emerald-500/50'}`}></span>
                              {inc.status === 'active' ? t.eventTable.statusActive : t.eventTable.statusResolved}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Adaptive Cards View */}
              <div className="md:hidden divide-y divide-slate-100 bg-white">
                {displayedIncidents.map((inc) => {
                  const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
                  const currentLocale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';
                  const dateRangeStr = inc.end
                    ? `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric' })} - ${new Date(inc.end).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric' })} - ${lang === 'he' ? 'פעיל כעת' : lang === 'ru' ? 'Активно' : 'Active'}`;

                  return (
                    <div key={inc.id} className="p-4 flex flex-col gap-2.5 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            {dateRangeStr}
                          </span>
                          <span className="font-bold text-slate-900 mt-0.5 text-xs font-heading">
                            {inc.isCoreUpdate 
                              ? (lang === 'he' ? 'עדכון ליבה רשמי של Google' : lang === 'ru' ? 'Обновление алгоритма Google' : 'Core Update') 
                              : serviceLabel}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold select-none shadow-2xs ${
                          inc.service === 'Ranking' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                          inc.service === 'Indexing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {serviceLabel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {inc.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                        <span className="text-slate-400 font-mono">ID: {inc.id.substring(0, 15)}</span>
                        <span className={`inline-flex items-center gap-1.5 font-bold ${
                          inc.status === 'active' ? 'text-rose-600' : 'text-emerald-700'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${inc.status === 'active' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                          {inc.status === 'active' ? t.eventTable.statusActive : t.eventTable.statusResolved}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </section>

        {/* SEO Educational & FAQ Accordion Section */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] flex flex-col gap-6" id="faq-section">
          <div className="flex flex-col border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 tracking-tight">
              {t.faq.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((num) => {
              const qKey = `q${num}` as keyof typeof t.faq;
              const aKey = `a${num}` as keyof typeof t.faq;
              const qText = t.faq[qKey];
              const aText = t.faq[aKey];
              const isOpen = expandedFaq[num] || false;

              return (
                <div 
                  key={num} 
                  className={`border rounded-2xl overflow-hidden transition-all bg-white shadow-2xs ${
                    isOpen ? 'border-blue-300 ring-2 ring-blue-500/15' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(String(num))}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left rtl:text-right font-semibold text-slate-900 text-sm outline-none hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'bg-slate-100 text-slate-600'}`}>
                        <HelpCircle className="h-4 w-4 shrink-0" />
                      </div>
                      <span className="font-bold text-slate-900 leading-snug">{qText}</span>
                    </span>
                    {isOpen 
                      ? <ChevronUp className="h-4 w-4 text-blue-600 shrink-0" /> 
                      : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    }
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-2 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed border-t border-slate-100 bg-slate-50/60">
                          {aText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Executive Clean Footer */}
      <footer className="bg-white border-t border-slate-200/90 mt-12 sm:mt-14 select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-xs shadow-blue-500/50"></span>
            <span>
              {t.footer.toolName} {t.footer.by}{' '}
              <a
                href="https://netolink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Netolink
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-slate-500 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {t.footer.dataSource}
            </span>
            <span className="text-slate-200">|</span>
            <span className="font-mono text-[11px] text-slate-400">{t.footer.copyright} {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
