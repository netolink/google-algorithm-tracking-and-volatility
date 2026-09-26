/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, TranslationDict } from './types';

export const translations: Record<Language, TranslationDict> = {
  en: {
    title: 'Google Algorithm & Volatility Tracker',
    subtitle: 'Real-time SERP volatility analytics correlated with official Google search infrastructure incidents.',
    langLabel: 'Language',
    by: 'by',
    asOfDate: 'As of:',
    volatilityIndexLabel: 'Volatility Index',
    trendsSearchVolumeLabel: 'Google Trends Search Volume',
    timeframes: {
      thirtyDays: '30 Days',
      ninetyDays: '90 Days',
      year: '365 Days'
    },
    liveStatus: {
      title: 'Current SERP Environment Status',
      calmDesc: 'Calm search environment. Low volatility, organic search results are stable and consistent.',
      volatileDesc: 'Unstable. Moderate fluctuations detected. Localized ranking shifts or early update phases possible.',
      stormDesc: 'Algo Storm! Heavy algorithmic turbulence. High ranking volatility observed globally.',
      outageDesc: 'Critical Incident. Google Search systems or indexing infrastructure are currently experiencing technical errors.'
    },
    volatilityGuide: {
      title: 'Volatility Reference Levels',
      subtitle: 'Understanding Google algorithm volatility index levels and SEO implications.',
      calm: {
        title: 'Calm (0% - 30%)',
        label: 'Calm',
        range: '0% - 30%',
        desc: 'Normal baseline fluctuations. No active core or spam algorithm updates monitored.'
      },
      volatile: {
        title: 'Unstable (31% - 60%)',
        label: 'Unstable',
        range: '31% - 60%',
        desc: 'Minor update rollouts or system indexing anomalies. Monitor search rankings closely.'
      },
      storm: {
        title: 'Algo Storm (61%+)',
        label: 'Storm',
        range: '61% - 100%',
        desc: 'Official Core or Spam update active, or major system outage. High ranking flux globally.'
      }
    },
    trends: {
      toggleLabel: 'Google Trends Overlay',
      overlayTitle: 'Google Trends Search Interest Overlay',
      overlaySubtitle: 'Visualize correlation between public search spikes for algorithm queries and SERP volatility fluctuations.',
      presetsLabel: 'Curated Presets',
      customInputPlaceholder: 'Type custom query (e.g. helpful content update)...',
      customInputLabel: 'Custom Keyword',
      geoLabel: 'Region',
      interestAxis: 'Trends Search Interest (0-100)',
      correlationTitle: 'Correlation Analysis',
      correlationScore: 'Pearson Correlation (r)',
      presets: {
        google_algorithm_update: 'Google algorithm update',
        google_core_update: 'Google core update',
        serp_volatility: 'SERP volatility',
        google_ranking_drop: 'Google ranking drop',
        google_search_update: 'Google search update'
      },
      countries: {
        worldwide: 'Worldwide',
        us: 'United States',
        uk: 'United Kingdom',
        il: 'Israel',
        de: 'Germany',
        ru: 'Russia'
      },
      correlationStrength: {
        strong_pos: 'Strong Positive',
        moderate_pos: 'Moderate Positive',
        weak_pos: 'Weak Positive',
        neutral: 'Neutral / Minimal',
        negative: 'Inverted'
      },
      correlationDesc: {
        strong_positive: 'High synchronicity: Public search surges strongly align with ranking volatility spikes.',
        moderate_positive: 'Moderate synchronicity: Noticeable search volume elevation around major volatility events.',
        weak_positive: 'Slight synchronicity: Minimal overlap between search spikes and ranking fluctuations.',
        neutral: 'Independent signals: Search volume movements show no strong statistical tie to ranking shifts.',
        negative: 'Divergent: Search queries and volatility behaved asynchronously during this timeframe.'
      },
      tooltipInterest: 'Google Trends Interest:',
      volatilityIndex: 'Volatility Index',
      trendsSearchVolume: 'Google Trends Search Volume',
      tooltipVolatility: 'Volatility Index',
      tooltipSearchVolume: 'Google Trends Search Volume',
      customBadge: 'Custom',
      openInGoogleTrends: 'Open in Google Trends'
    },
    eventTable: {
      title: 'Google Search Incident & Update Log',
      subtitle: 'Official incident and update logs synchronized with Google Search Status Dashboard.',
      colDate: 'Date Range',
      colEvent: 'Incident & Context',
      colType: 'Service / Type',
      colStatus: 'Status',
      statusActive: 'Active',
      statusResolved: 'Resolved',
      noEvents: 'No official security or system incidents reported by Google during this timeframe.',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details'
    },
    alerts: {
      headerBtn: 'Alerts',
      modalTitle: 'Volatility Alerts & Notifications',
      modalSubtitle: 'Get notified instantly when the Google SERP Volatility Index spikes above critical thresholds.',
      browserTitle: 'Browser Push Notifications',
      browserDesc: 'Receive real-time desktop or mobile browser alerts during major algorithm turbulence.',
      browserEnableBtn: 'Enable Browser Alerts',
      browserEnabledBadge: 'Browser Alerts Active',
      browserDeniedBadge: 'Notifications Blocked in Browser',
      browserNotSupported: 'Browser notifications not supported on this device.',
      testAlertBtn: 'Send Test Alert',
      testAlertSent: 'Test alert sent!',
      emailTitle: 'Email Notification Alerts',
      emailDesc: 'Receive digest warnings sent directly to your inbox when a Google core update or storm is detected.',
      emailPlaceholder: 'Enter your business email...',
      thresholdLabel: 'Alert Threshold',
      thresholds: {
        fifty: '> 50% Volatility (Moderate Turbulence)',
        sixty: '> 60% Volatility (Algo Storm - Recommended)',
        seventyFive: '> 75% Volatility (Extreme Turbulence)'
      },
      subscribeBtn: 'Subscribe to Alerts',
      subscribedBadge: 'Subscribed',
      unsubscribeBtn: 'Unsubscribe',
      emailSuccess: 'Subscription confirmed! You will receive alerts when volatility exceeds your threshold.',
      emailInvalid: 'Please enter a valid email address.',
      testNotificationTitle: 'Google Volatility Radar Alert (Test)',
      testNotificationBody: 'Test notification successful. You will be notified when SERP volatility spikes above your threshold.',
      highVolatilityAlertTitle: '⚠️ Google Algorithm Storm Detected!',
      highVolatilityAlertBody: 'Current SERP volatility has spiked to {val}%, exceeding your alert threshold.',
      howItWorksTitle: 'How Do Alerts Work?',
      howItWorksDesc: 'Browser alerts use your native browser Notification API directly. For email alerts, your subscription preferences and threshold are saved in local storage. In a live production deployment, this connects to a backend email relay or SMTP provider (e.g. SendGrid, Mailgun, Amazon SES) to dispatch automated delivery.',
      testEmailBtn: 'Send Test Email',
      testEmailModalTitle: 'Alert Email Preview (Simulation)',
      testEmailModalClose: 'Close Preview',
      close: 'Close'
    },
    faq: {
      title: 'Google Algorithm Core FAQ',
      subtitle: 'Answers to essential questions surrounding SERP tracking and search ecosystem health.',
      q1: 'How is the Volatility Index calculated?',
      a1: 'The Volatility Index (0%–100%) merges baseline organic SERP fluctuations with significant spikes triggered during official Google Search updates (Core/Spam updates) and confirmed search infrastructure incidents.',
      q2: 'What is the purpose of the Google Search Status Dashboard?',
      a2: 'Google officially publishes system status alerts covering Ranking, Indexing, Crawling, and Serving. By correlating official outages and announcements with volatility, SEO specialists can instantly determine if drops are due to site issues or Google side changes.',
      q3: 'What should I do during an Algorithm Storm?',
      a3: 'During an active Algo Storm or Core Update rollout, Google recommends avoiding premature site modifications. Wait until the rollout is fully completed (typically 2–3 weeks) to audit traffic changes and plan optimizations.',
      q4: 'How does the translation and regional tracking engine work?',
      a4: 'This application dynamically manages layout directions. Selecting Hebrew enables bi-directional Right-to-Left (RTL) mode with verified Hebrew SEO terminology. Russian uses verified professional search industry terminology.'
    },
    services: {
      Ranking: 'Ranking',
      Indexing: 'Indexing',
      Serving: 'Serving',
      Crawling: 'Crawling',
      General: 'General Status'
    },
    apiStatus: {
      loading: 'Connecting to official Google Search Status Dashboard API...',
      direct: 'Connected directly to Google Search Status API (Official Endpoint).',
      synced: 'Synchronized via official Google Search Status API (Automated GitHub Actions sync, zero proxies).',
      usingLocal: 'Loaded official Google algorithm updates from local dataset cache.',
      apiSuccess: 'Successfully synchronized with official Google Search Status Dashboard.',
      lastUpdated: 'Synchronized at',
      refreshBtn: 'Refresh'
    },
    footer: {
      toolName: 'Google Algorithm & Volatility Tracker',
      by: 'by',
      copyright: 'All rights reserved ©',
      dataSource: 'Based on official Google Search Status data'
    }
  },
  he: {
    title: 'מעקב עדכוני אלגוריתם ותנודתיות ב-Google',
    subtitle: 'ניתוח תנודתיות בתוצאות החיפוש (SERP) בזמן אמת, בהצלבה עם דיווחי תקלות ועדכונים רשמיים מבית Google.',
    langLabel: 'שפה',
    by: 'מבית',
    asOfDate: 'נכון ל:',
    volatilityIndexLabel: 'מדד תנודתיות',
    trendsSearchVolumeLabel: 'נפח חיפוש Google Trends',
    timeframes: {
      thirtyDays: '30 יום',
      ninetyDays: '90 יום',
      year: '365 יום'
    },
    liveStatus: {
      title: 'סטטוס סביבת החיפוש הנוכחי (SERP)',
      calmDesc: 'סביבת חיפוש רגועה. רמת תנודתיות נמוכה, תוצאות החיפוש האורגניות יציבות ועקביות.',
      volatileDesc: 'תנודתיות מוגברת. נמדדו תנודות בינוניות במיקומים. ייתכנו תזוזות מקומיות או שלבי השקה ראשוניים של עדכון.',
      stormDesc: 'סערת אלגוריתם! תנודתיות אלגוריתמית חריפה. תנודות משמעותיות בדירוגים נצפו ברחבי הרשת.',
      outageDesc: 'תקלה מערכתית קריטית. מערכות האינדוקס, הזחילה או הגשת התוצאות של Google חוות כעת שיבושים טכניים.'
    },
    volatilityGuide: {
      title: 'מדד רמות תנודתיות',
      subtitle: 'הסבר מקצועי על רמות מדד התנודתיות והשפעתן על הקידום האורגני (SEO).',
      calm: {
        title: 'רגוע (0% - 30%)',
        label: 'רגוע',
        range: '0% - 30%',
        desc: 'תנודות שגרתיות וטבעיות בתוצאות החיפוש. לא זוהו עדכוני ליבה או ספאם פעילים ברקע.'
      },
      volatile: {
        title: 'תנודתי (31% - 60%)',
        label: 'תנודתי',
        range: '31% - 60%',
        desc: 'שלבי בדיקה של עדכונים קטנים או אנומליות באינדוקס. מומלץ לעקוב מקרוב אחר דירוגי האתר.'
      },
      storm: {
        title: 'סערת אלגוריתם (61%+)',
        label: 'סערה',
        range: '61% - 100%',
        desc: 'עדכון ליבה או ספאם רשמי פעיל, או תקלת מערכת רחבה. תנודתיות חריגה ומשמעותית בדירוגים בעולם.'
      }
    },
    trends: {
      toggleLabel: 'שכבת Google Trends',
      overlayTitle: 'שכבת מגמות חיפוש Google Trends',
      overlaySubtitle: 'הצגת קורלציה בין זינוקים בנפח החיפוש הציבורי עבור מונחי עדכונים לבין שיאי תנודתיות בתוצאות החיפוש (SERP).',
      presetsLabel: 'מונחי מפתח נבחרים',
      customInputPlaceholder: 'הקלד ביטוי מותאם אישית (למשל: helpful content update)...',
      customInputLabel: 'ביטוי מותאם אישית',
      geoLabel: 'אזור גיאוגרפי',
      interestAxis: 'מדד עניין בחיפוש Trends (0-100)',
      correlationTitle: 'ניתוח קורלציה',
      correlationScore: 'מקדם פירסון (r)',
      presets: {
        google_algorithm_update: 'Google algorithm update',
        google_core_update: 'Google core update',
        serp_volatility: 'SERP volatility',
        google_ranking_drop: 'Google ranking drop',
        google_search_update: 'Google search update'
      },
      countries: {
        worldwide: 'גלובלי (כל העולם)',
        us: 'ארצות הברית',
        uk: 'בריטניה',
        il: 'ישראל',
        de: 'גרמניה',
        ru: 'רוסיה'
      },
      correlationStrength: {
        strong_pos: 'קורלציה חזקה',
        moderate_pos: 'קורלציה בינונית',
        weak_pos: 'קורלציה חלשה',
        neutral: 'ללא קורלציה מובהקת',
        negative: 'קורלציה הפוכה'
      },
      correlationDesc: {
        strong_positive: 'סנכרון גבוה: זינוקים בנפח החיפוש חופפים באופן ישיר לסערות תנודתיות בדירוגים.',
        moderate_positive: 'סנכרון ניכר: נרשמה עלייה מורגשת בחיפושים במקביל לאירועי תנודתיות מרכזיים.',
        weak_positive: 'סנכרון קל: חפיפה מועטה בלבד בין נפחי החיפוש לתנודות בדירוג.',
        neutral: 'מדדים בלתי תלויים: לא נמצא קשר סטטיסטי ישיר בין מגמות החיפוש לתנודתיות בטווח זה.',
        negative: 'מגמות מנוגדות: נרשמה אי-התאמה בין זמני השיא של החיפושים לתנודתיות התוצאות.'
      },
      tooltipInterest: 'עניין ב-Google Trends:',
      volatilityIndex: 'מדד תנודתיות',
      trendsSearchVolume: 'נפח חיפוש Google Trends',
      tooltipVolatility: 'מדד תנודתיות',
      tooltipSearchVolume: 'נפח חיפוש Google Trends',
      customBadge: 'מותאם',
      openInGoogleTrends: 'פתח ב-Google Trends הרשמי'
    },
    eventTable: {
      title: 'יומן אירועים ועדכונים רשמי - Google Search',
      subtitle: 'יומן אירועים ועדכונים רשמי מתוך לוח הבקרה של Google Search Status Dashboard.',
      colDate: 'טווח תאריכים',
      colEvent: 'אירוע ופירוט',
      colType: 'סוג / שירות',
      colStatus: 'סטטוס',
      statusActive: 'פעיל כעת',
      statusResolved: 'הושלם',
      noEvents: 'לא דווחו תקלות או עדכוני אלגוריתם רשמיים על ידי Google בטווח הזמן שנבחר.',
      showDetails: 'הצג פרטים',
      hideDetails: 'הסתר פרטים'
    },
    alerts: {
      headerBtn: 'התראות',
      modalTitle: 'התראות תנודתיות וסערות אלגוריתם',
      modalSubtitle: 'קבלו התראה מיידית כאשר מדד התנודתיות בתוצאות החיפוש (SERP) חוצה סף קריטי.',
      browserTitle: 'התראות דפדפן (Browser Push)',
      browserDesc: 'קבלת התראות ישירות למחשב או לנייד בזמן אמת בעת זיהוי סערת אלגוריתם פעילה.',
      browserEnableBtn: 'הפעל התראות דפדפן',
      browserEnabledBadge: 'התראות דפדפן פעילות',
      browserDeniedBadge: 'התראות חסומות בהגדרות הדפדפן',
      browserNotSupported: 'הדפדפן אינו תומך בהתראות במכשיר זה.',
      testAlertBtn: 'שלח התראת בדיקה',
      testAlertSent: 'התראת בדיקה נשלחה בהצלחה!',
      emailTitle: 'התראות בדוא"ל',
      emailDesc: 'קבלת עדכונים ישירות לתיבת הדוא"ל בעת השקת עדכון ליבה או סערת דירוגים חריפה.',
      emailPlaceholder: 'הזן כתובת דוא"ל לקבלת התראות...',
      thresholdLabel: 'סף התראה להפעלה',
      thresholds: {
        fifty: '> 50% תנודתיות (אי-יציבות מתונה)',
        sixty: '> 60% תנודתיות (סערת אלגוריתם - מומלץ)',
        seventyFive: '> 75% תנודתיות (סערה קיצונית)'
      },
      subscribeBtn: 'הרשמה לקבלת התראות',
      subscribedBadge: 'מנוי פעיל',
      unsubscribeBtn: 'ביטול מנוי',
      emailSuccess: 'הרשמתך עודכנה בהצלחה! תקבל התראה כאשר התנודתיות תחצה את הסף הנבחר.',
      emailInvalid: 'נא להזין כתובת דוא"ל תקינה.',
      testNotificationTitle: 'התראת ניטור אלגוריתם Google (בדיקה)',
      testNotificationBody: 'התראת הבדיקה נשלחה בהצלחה. תקבל הודעה בעת זיהוי קפיצה בתנודתיות.',
      highVolatilityAlertTitle: '⚠️ זוהתה סערת אלגוריתם ב-Google!',
      highVolatilityAlertBody: 'מדד התנודתיות בתוצאות החיפוש זינק ל-{val}%, מעל סף ההתראה שהגדרת.',
      howItWorksTitle: 'איך התראות עובדות? (מידע טכני מלא)',
      howItWorksDesc: 'התראות דפדפן (Browser Push) עובדות ישירות דרך ה-Web Notification API של הדפדפן שלך. התראות אימייל נשמרות מקומית באפליקציה (localStorage); בסביבת ייצור (Production), הן מתחברות לשרת Backend או ספק שירותי דוא"ל (כגון SendGrid, Mailgun, AWS SES או שרת SMTP ייעודי) לשיגור התראות אוטומטי.',
      testEmailBtn: 'בדיקת התראת אימייל (Test)',
      testEmailModalTitle: 'תצוגה מקדימה: התראת אימייל לדוגמה',
      testEmailModalClose: 'סגור תצוגה',
      close: 'סגור'
    },
    faq: {
      title: 'שאלות ותשובות נפוצות על אלגוריתם Google',
      subtitle: 'מידע חיוני על מעקב תנודות ומצב הבריאות של סביבת ה-SERP.',
      q1: 'כיצד מחושב מדד התנודתיות?',
      a1: 'מדד התנודתיות (0%–100%) משלב תנודות אורגניות שגרתיות בדפי התוצאות (SERP) יחד עם קפיצות תנודתיות חדות המתרחשות בתאריכים שבהם הושקו עדכוני אלגוריתם רשמיים (כגון Core Updates או עדכוני ספאם) או בעת תקלות תשתית מדווחות של Google.',
      q2: 'מהי המטרה של Google Search Status Dashboard?',
      a2: 'Google מפרסמת באופן רשמי התראות סטטוס עבור מערכות הדירוג (Ranking), האינדוקס (Indexing), הזחילה והסריקה (Crawling), והגשת התוצאות (Serving). הצלבת המידע הרשמי עם מדד התנודתיות מאפשרת לאנשי SEO לדעת מיד האם שינויים במיקומים נובעים מבעיה באתר עצמו או משינוי גלובלי מצד Google.',
      q3: 'מה מומלץ לעשות בזמן סערת אלגוריתם?',
      a3: 'בזמן עדכון ליבה פעיל או סערת אלגוריתם, ההמלצה הרשמית של Google היא להימנע משינויים חפוזים באתר. מומלץ להמתין עד לסיום הפריסה המלא של העדכון (לרוב בין שבועיים לשלושה) ורק לאחר מכן לנתח באופן יסודי את ביצועי האתר והתנועה האורגנית.',
      q4: 'כיצד פועל מנגנון התרגום והתמיכה בריבוי שפות?',
      a4: 'המערכת מתאימה באופן דינמי את מבנה הממשק וכיוונו. בחירה בעברית מפעילה מצב מימין לשמאל (RTL) מלא, תוך שימוש במונחים המקצועיים המקובלים ביותר בעולם קידום האתרים (SEO), כולל התאמה מדויקת של מושגים כמו אינדוקס, זחילה, הגשה ודירוגים.'
    },
    services: {
      Ranking: 'דירוג (Ranking)',
      Indexing: 'אינדוקס (Indexing)',
      Serving: 'הגשת תוצאות (Serving)',
      Crawling: 'סריקה וזחילה (Crawling)',
      General: 'סטטוס כללי'
    },
    apiStatus: {
      loading: 'מתחבר ל-API הרשמי של Google Search Status...',
      direct: 'מחובר ישירות ל-API הרשמי של Google Search Status.',
      synced: 'מסונכרן מול ה-API הרשמי של Google (סנכרון אוטומטי ללא שרתי פרוקסי).',
      usingLocal: 'הנתונים נטענו ממאגר עדכוני האלגוריתם המקומי.',
      apiSuccess: 'סנכרון מול Google Search Status Dashboard הושלם בהצלחה.',
      lastUpdated: 'סונכרן בשעה',
      refreshBtn: 'רענון'
    },
    footer: {
      toolName: 'מעקב עדכוני אלגוריתם ותנודתיות ב-Google',
      by: 'מבית',
      copyright: 'כל הזכויות שמורות ©',
      dataSource: 'מבוסס על נתוני Google Search Status הרשמיים'
    }
  },
  ru: {
    title: 'Мониторинг алгоритмов и волатильности Google',
    subtitle: 'Аналитика волатильности поисковой выдачи (SERP) в реальном времени, сопоставленная с официальными сбоями и обновлениями Google.',
    langLabel: 'Язык',
    by: 'от',
    asOfDate: 'Данные на:',
    volatilityIndexLabel: 'Индекс волатильности',
    trendsSearchVolumeLabel: 'Объем поиска Google Trends',
    timeframes: {
      thirtyDays: '30 дней',
      ninetyDays: '90 дней',
      year: '365 дней'
    },
    liveStatus: {
      title: 'Текущее состояние выдачи (SERP)',
      calmDesc: 'Спокойная поисковая выдача. Низкая волатильность, органические результаты поиска стабильны и последовательны.',
      volatileDesc: 'Повышенная турбулентность. Зафиксированы умеренные колебания. Возможны локальные изменения или ранняя фаза раскатки обновления.',
      stormDesc: 'Шторм алгоритма! Сильнейшая алгоритмическая турбулентность. Наблюдается резкая волатильность позиций по всему миру.',
      outageDesc: 'Критический сбой. Системы индексации, сканирования или ранжирования Google испытывают технические неполадки.'
    },
    volatilityGuide: {
      title: 'Уровни волатильности',
      subtitle: 'Классификация уровней волатильности поисковой выдачи и их значение для SEO.',
      calm: {
        title: 'Спокойно (0% - 30%)',
        label: 'Спокойно',
        range: '0% - 30%',
        desc: 'Естественные базовые колебания. Активных обновлений основного алгоритма (Core) или спам-фильтров не обнаружено.'
      },
      volatile: {
        title: 'Нестабильно (31% - 60%)',
        label: 'Нестабильно',
        range: '31% - 60%',
        desc: 'Предварительные раскатки небольших обновлений или аномалии индексации. Рекомендуется внимательно следить за позициями.'
      },
      storm: {
        title: 'Шторм алгоритма (61%+)',
        label: 'Шторм',
        range: '61% - 100%',
        desc: 'Активно официальное обновление основного алгоритма (Core) или спам-фильтров, либо крупный сбой Google. Высокая турбулентность выдачи.'
      }
    },
    trends: {
      toggleLabel: 'Слой Google Trends',
      overlayTitle: 'Слой поискового интереса Google Trends',
      overlaySubtitle: 'Сопоставление всплесков поискового интереса к обновлениям алгоритма с пиками турбулентности SERP.',
      presetsLabel: 'Популярные запросы',
      customInputPlaceholder: 'Пользовательский запрос (напр., helpful content update)...',
      customInputLabel: 'Свой запрос',
      geoLabel: 'Регион',
      interestAxis: 'Интерес по Google Trends (0-100)',
      correlationTitle: 'Анализ корреляции',
      correlationScore: 'Коэффициент Пирсона (r)',
      presets: {
        google_algorithm_update: 'Google algorithm update',
        google_core_update: 'Google core update',
        serp_volatility: 'SERP volatility',
        google_ranking_drop: 'Google ranking drop',
        google_search_update: 'Google search update'
      },
      countries: {
        worldwide: 'Весь мир',
        us: 'США',
        uk: 'Великобритания',
        il: 'Израиль',
        de: 'Германия',
        ru: 'Россия'
      },
      correlationStrength: {
        strong_pos: 'Сильная корреляция',
        moderate_pos: 'Умеренная корреляция',
        weak_pos: 'Слабая корреляция',
        neutral: 'Без выраженной связи',
        negative: 'Обратная динамика'
      },
      correlationDesc: {
        strong_positive: 'Высокая синхронность: Всплески запросов в поиске напрямую совпадают со штормами волатильности.',
        moderate_positive: 'Заметная синхронность: Фиксируется рост интереса вокруг ключевых обновлений.',
        weak_positive: 'Слабая синхронность: Незначительное пересечение графиков интереса и колебаний выдачи.',
        neutral: 'Независимые сигналы: Поисковый интерес не имеет выраженной статистической связи с турбулентностью.',
        negative: 'Разнонаправленная динамика: Пики запросов и волатильности не совпали в выбранном периоде.'
      },
      tooltipInterest: 'Интерес в Google Trends:',
      volatilityIndex: 'Индекс волатильности',
      trendsSearchVolume: 'Объем поиска Google Trends',
      tooltipVolatility: 'Индекс волатильности',
      tooltipSearchVolume: 'Объем поиска Google Trends',
      customBadge: 'Пользовательский',
      openInGoogleTrends: 'Открыть в Google Trends'
    },
    eventTable: {
      title: 'Реестр сбоев и обновлений Google Search',
      subtitle: 'Официальные данные мониторинга, синхронизируемые с Google Search Status Dashboard.',
      colDate: 'Диапазон дат',
      colEvent: 'Инцидент и детали',
      colType: 'Сервис / Тип',
      colStatus: 'Статус',
      statusActive: 'Активно',
      statusResolved: 'Завершено',
      noEvents: 'За выбранный период времени официальных сбоев или обновлений Google не зафиксировано.',
      showDetails: 'Показать детали',
      hideDetails: 'Скрыть детали'
    },
    alerts: {
      headerBtn: 'Оповещения',
      modalTitle: 'Оповещения о волатильности SERP',
      modalSubtitle: 'Получайте мгновенные уведомления, когда индекс волатильности поисковой выдачи превышает заданный порог.',
      browserTitle: 'Push-уведомления в браузере',
      browserDesc: 'Получайте оповещения на рабочий стол или смартфон в реальном времени при шторме алгоритма.',
      browserEnableBtn: 'Включить push-уведомления',
      browserEnabledBadge: 'Уведомления браузера активны',
      browserDeniedBadge: 'Уведомления заблокированы в браузере',
      browserNotSupported: 'Браузер не поддерживает уведомления на этом устройстве.',
      testAlertBtn: 'Тестовое оповещение',
      testAlertSent: 'Тестовое оповещение отправлено!',
      emailTitle: 'Оповещения по электронной почте',
      emailDesc: 'Получайте оперативные предупреждения на почту при обнаружении официальных обновлений ядра или штормов.',
      emailPlaceholder: 'Введите рабочий адрес e-mail...',
      thresholdLabel: 'Порог срабатывания оповещения',
      thresholds: {
        fifty: '> 50% волатильности (умеренная турбулентность)',
        sixty: '> 60% волатильности (шторм алгоритма - рекомендуемый)',
        seventyFive: '> 75% волатильности (экстремальный шторм)'
      },
      subscribeBtn: 'Подписаться на оповещения',
      subscribedBadge: 'Подписка активна',
      unsubscribeBtn: 'Отписаться',
      emailSuccess: 'Подписка успешно оформлена! Вы получите уведомление при превышении выбранного порога.',
      emailInvalid: 'Пожалуйста, введите корректный адрес электронной почты.',
      testNotificationTitle: 'Радар алгоритмов Google (Тест)',
      testNotificationBody: 'Тестовое уведомление доставлено. Вы будете предупреждены при резких скачках турбулентности.',
      highVolatilityAlertTitle: '⚠️ Обнаружен шторм алгоритма Google!',
      highVolatilityAlertBody: 'Текущий индекс волатильности подскочил до {val}%, превысив ваш порог срабатывания.',
      howItWorksTitle: 'Как работают оповещения?',
      howItWorksDesc: 'Push-уведомления работают напрямую через встроенный браузерный Notification API. Оповещения по email сохраняют ваши настройки в локальном хранилище; для реальной отправки в production подключается почтовый сервис (SMTP, SendGrid, Mailgun или Amazon SES) на серверной стороне.',
      testEmailBtn: 'Тестовое письмо (Test)',
      testEmailModalTitle: 'Предпросмотр email-оповещения',
      testEmailModalClose: 'Закрыть предпросмотр',
      close: 'Закрыть'
    },
    faq: {
      title: 'Часто задаваемые вопросы об алгоритмах Google',
      subtitle: 'Ключевая информация об отслеживании алгоритмов и мониторинге поисковой выдачи (SERP).',
      q1: 'Как рассчитывается индекс волатильности?',
      a1: 'Индекс волатильности (0%–100%) объединяет фоновые органические колебания поисковой выдачи (SERP) с резкими всплесками турбулентности, возникающими в периоды официальных обновлений алгоритма Google (Core/Spam Updates) и подтвержденных технических сбоев поисковой инфраструктуры.',
      q2: 'Для чего используется панель Google Search Status?',
      a2: 'Google официально публикует статус работы ключевых сервисов: Ранжирование (Ranking), Индексация (Indexing), Сканирование (Crawling) и Выдача результатов (Serving). Сопоставление этих данных с графиком волатильности позволяет SEO-специалистам оперативно определить, вызвано ли падение позиций проблемой на сайте или глобальными изменениями Google.',
      q3: 'Что делать во время шторма алгоритма?',
      a3: 'Во время активного обновления ядра (Core Update) или шторма алгоритма Google строго рекомендует не предпринимать поспешных изменений на сайте. Дождитесь официального завершения раскатки обновления (обычно 2–3 недели), после чего проведите детальный аудит трафика и позиций.',
      q4: 'Как работает языковая локализация?',
      a4: 'Приложение динамически адаптирует интерфейс под выбранный язык. Для иврита включается полная поддержка направления текста справа налево (RTL), а для русского языка используется выверенная профессиональная терминология поисковой оптимизации (SEO).'
    },
    services: {
      Ranking: 'Ранжирование (Ranking)',
      Indexing: 'Индексация (Indexing)',
      Serving: 'Выдача результатов (Serving)',
      Crawling: 'Сканирование (Crawling)',
      General: 'Общее состояние'
    },
    apiStatus: {
      loading: 'Подключение к официальному API Google Search Status...',
      direct: 'Прямое подключение к официальному API Google Search Status.',
      synced: 'Синхронизировано с официальным API Google (автоматическая синхронизация без сторонних прокси).',
      usingLocal: 'Данные загружены из локального реестра официальных обновлений Google.',
      apiSuccess: 'Синхронизация с панелью Google Search Status Dashboard успешно завершена.',
      lastUpdated: 'Синхронизировано в',
      refreshBtn: 'Обновить'
    },
    footer: {
      toolName: 'Мониторинг алгоритмов и волатильности Google',
      by: 'от',
      copyright: 'Все права защищены ©',
      dataSource: 'На основе официальных данных Google Search Status'
    }
  }
};
