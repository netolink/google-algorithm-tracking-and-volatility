/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'he' | 'ru';

export interface TranslationDict {
  title: string;
  subtitle: string;
  langLabel: string;
  by: string;
  asOfDate: string;
  volatilityIndexLabel: string;
  trendsSearchVolumeLabel: string;
  timeframes: {
    thirtyDays: string;
    ninetyDays: string;
    year: string;
  };
  liveStatus: {
    title: string;
    calmDesc: string;
    volatileDesc: string;
    stormDesc: string;
    outageDesc: string;
  };
  volatilityGuide: {
    title: string;
    subtitle: string;
    calm: {
      title: string;
      label?: string;
      range: string;
      desc: string;
    };
    volatile: {
      title: string;
      label?: string;
      range: string;
      desc: string;
    };
    storm: {
      title: string;
      label?: string;
      range: string;
      desc: string;
    };
  };
  trends: {
    toggleLabel: string;
    overlayTitle: string;
    overlaySubtitle: string;
    presetsLabel: string;
    customInputPlaceholder: string;
    customInputLabel: string;
    geoLabel: string;
    interestAxis: string;
    correlationTitle: string;
    correlationScore: string;
    presets: {
      google_algorithm_update: string;
      google_core_update: string;
      serp_volatility: string;
      google_ranking_drop: string;
      google_search_update: string;
    };
    countries: {
      worldwide: string;
      us: string;
      uk: string;
      il: string;
      de: string;
      ru: string;
    };
    correlationStrength: {
      strong_pos: string;
      moderate_pos: string;
      weak_pos: string;
      neutral: string;
      negative: string;
    };
    correlationDesc: {
      strong_positive: string;
      moderate_positive: string;
      weak_positive: string;
      neutral: string;
      negative: string;
    };
    tooltipInterest: string;
    volatilityIndex: string;
    trendsSearchVolume: string;
    tooltipVolatility: string;
    tooltipSearchVolume: string;
    customBadge: string;
    openInGoogleTrends: string;
  };
  eventTable: {
    title: string;
    subtitle: string;
    colDate: string;
    colEvent: string;
    colType: string;
    colStatus: string;
    statusActive: string;
    statusResolved: string;
    noEvents: string;
    showDetails: string;
    hideDetails: string;
  };
  alerts: {
    headerBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    browserTitle: string;
    browserDesc: string;
    browserEnableBtn: string;
    browserEnabledBadge: string;
    browserDeniedBadge: string;
    browserNotSupported: string;
    testAlertBtn: string;
    testAlertSent: string;
    emailTitle: string;
    emailDesc: string;
    emailPlaceholder: string;
    thresholdLabel: string;
    thresholds: {
      fifty: string;
      sixty: string;
      seventyFive: string;
    };
    subscribeBtn: string;
    subscribedBadge: string;
    unsubscribeBtn: string;
    emailSuccess: string;
    emailInvalid: string;
    testNotificationTitle: string;
    testNotificationBody: string;
    highVolatilityAlertTitle: string;
    highVolatilityAlertBody: string;
    howItWorksTitle: string;
    howItWorksDesc: string;
    testEmailBtn: string;
    testEmailModalTitle: string;
    testEmailModalClose: string;
    close: string;
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  services: {
    Ranking: string;
    Indexing: string;
    Serving: string;
    Crawling: string;
    General: string;
  };
  apiStatus: {
    loading: string;
    direct: string;
    synced: string;
    usingLocal: string;
    apiSuccess: string;
    lastUpdated: string;
    refreshBtn: string;
  };
  footer: {
    toolName: string;
    by: string;
    copyright: string;
    dataSource: string;
  };
}

export type ServicesKeys = 'Ranking' | 'Indexing' | 'Serving' | 'Crawling' | 'General';

export interface RawGoogleIncident {
  id?: string;
  external_description?: string;
  description?: string;
  summary?: string;
  service?: string;
  source?: string;
  begin?: string;
  start_time?: string;
  end?: string;
  end_time?: string;
  resolved?: string;
  status?: string;
}

export interface NormalizedIncident {
  id: string;
  description: string;
  service: ServicesKeys;
  begin: Date;
  end: Date | null;
  status: 'active' | 'resolved';
  isCoreUpdate: boolean;
}

export interface VolatilityPoint {
  date: Date;
  dateStr: string;
  metricValue: number;
  incidentCount: number;
  incidents: NormalizedIncident[];
}
