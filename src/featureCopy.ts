/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './types';

export interface ChecklistItemCopy {
  id: string;
  phase: 'attribution' | 'technical' | 'content' | 'intent';
  title: string;
  desc: string;
}

export interface FeatureCopy {
  chartControls: {
    movingAvgToggle: string;
    movingAvgLabel: string;
    exportCsv: string;
    exportPng: string;
    highlightedPrefix: string;
    clearHighlight: string;
  };
  insights: {
    title: string;
    subtitle: string;
    avgCoreDuration: string;
    avgSpamDuration: string;
    avgCadence: string;
    daysSinceLast: string;
    daysUnit: string;
    noCompletedData: string;
    monthlyTitle: string;
    legendCore: string;
    legendSpam: string;
    legendSystem: string;
    noIncidentsMonth: string;
  };
  drawer: {
    title: string;
    durationLabel: string;
    startLabel: string;
    endLabel: string;
    ongoingLabel: string;
    serviceLabel: string;
    statusLabel: string;
    highlightOnChart: string;
    highlightedOnChart: string;
    updatesTimelineTitle: string;
    updatesCount: string;
    prevIncident: string;
    nextIncident: string;
    close: string;
    daysShort: string;
    hoursShort: string;
    viewTimelineBtn: string;
  };
  checklist: {
    title: string;
    subtitle: string;
    activeBanner: string;
    calmBanner: string;
    progressLabel: string;
    resetBtn: string;
    phases: {
      attribution: string;
      technical: string;
      content: string;
      intent: string;
    };
    items: ChecklistItemCopy[];
  };
  csvHeaders: {
    date: string;
    volatility: string;
    movingAvg: string;
    incidentCount: string;
    incidents: string;
  };
}

export const featureCopy: Record<Language, FeatureCopy> = {
  en: {
    chartControls: {
      movingAvgToggle: '7D Avg',
      movingAvgLabel: '7-Day Moving Avg',
      exportCsv: 'Export CSV',
      exportPng: 'Export PNG',
      highlightedPrefix: 'Highlighted:',
      clearHighlight: 'Clear'
    },
    insights: {
      title: 'Historical Update Insights',
      subtitle: 'Rollout benchmarks and 12-month incident frequency from official Google Search history.',
      avgCoreDuration: 'Avg. Core Rollout',
      avgSpamDuration: 'Avg. Spam Rollout',
      avgCadence: 'Avg. Update Interval',
      daysSinceLast: 'Since Last Algo Update',
      daysUnit: 'days',
      noCompletedData: 'N/A',
      monthlyTitle: '12-Month Activity Distribution',
      legendCore: 'Core / Discover',
      legendSpam: 'Spam',
      legendSystem: 'System',
      noIncidentsMonth: 'No events'
    },
    drawer: {
      title: 'Incident Rollout Timeline',
      durationLabel: 'Duration',
      startLabel: 'Started',
      endLabel: 'Completed',
      ongoingLabel: 'Ongoing',
      serviceLabel: 'Service',
      statusLabel: 'Status',
      highlightOnChart: 'Highlight on Chart',
      highlightedOnChart: 'Highlighted on Chart',
      updatesTimelineTitle: 'Official Status Updates',
      updatesCount: 'updates',
      prevIncident: 'Previous',
      nextIncident: 'Next',
      close: 'Close',
      daysShort: 'd',
      hoursShort: 'h',
      viewTimelineBtn: 'Timeline'
    },
    checklist: {
      title: 'SEO Traffic Drop Diagnostic Checklist',
      subtitle: 'Structured triage workflow before making site-wide changes during algorithmic volatility.',
      activeBanner: 'An official Google update or search incident is currently active. Avoid premature structural changes until rollout settles.',
      calmBanner: 'No active Google rollout detected right now. Ranking shifts are more likely site-specific or competitive.',
      progressLabel: 'Completed',
      resetBtn: 'Reset',
      phases: {
        attribution: 'Attribution & Timing',
        technical: 'Technical & Indexing',
        content: 'Content & Spam Signals',
        intent: 'SERP & Competitor Shift'
      },
      items: [
        {
          id: 'attr-dates',
          phase: 'attribution',
          title: 'Match traffic drop dates against official rollout windows',
          desc: 'Compare Google Search Console clicks/impressions by exact date against the highlighted rollout span on the chart.'
        },
        {
          id: 'attr-wait',
          phase: 'attribution',
          title: 'Wait for official rollout completion before major edits',
          desc: 'Google advises holding structural changes while Core or Spam updates are actively rolling out, as rankings fluctuate mid-rollout.'
        },
        {
          id: 'tech-gsc',
          phase: 'technical',
          title: 'Verify Search Console Indexing & Manual Actions',
          desc: 'Rule out de-indexing spikes, robots.txt blocks, unintended noindex tags, canonical mismatches, or manual penalties.'
        },
        {
          id: 'tech-crawl',
          phase: 'technical',
          title: 'Check server status, TTFB & Googlebot crawl errors',
          desc: 'Confirm no 5xx spikes or CDN blocks coincided with Google Crawling or Serving incidents.'
        },
        {
          id: 'content-eeat',
          phase: 'content',
          title: 'Audit affected URLs for Helpful Content & E-E-A-T depth',
          desc: 'Review pages that lost traffic for originality, first-hand expertise, thin summaries, or scaled low-value content.'
        },
        {
          id: 'content-spam',
          phase: 'content',
          title: 'Inspect outbound/inbound link patterns & ad density',
          desc: 'During Spam Updates, evaluate site reputation abuse, doorway pages, or intrusive interstitials harming user experience.'
        },
        {
          id: 'intent-serp',
          phase: 'intent',
          title: 'Analyze SERP layout & intent changes for lost keywords',
          desc: 'Check whether AI Overviews, video packs, or new transactional/informational competitors displaced organic positions.'
        }
      ]
    },
    csvHeaders: {
      date: 'Date',
      volatility: 'Volatility (%)',
      movingAvg: '7D Moving Avg (%)',
      incidentCount: 'Active Incidents',
      incidents: 'Incident Details'
    }
  },
  he: {
    chartControls: {
      movingAvgToggle: 'ממוצע 7 ימים',
      movingAvgLabel: 'ממוצע נע (7 ימים)',
      exportCsv: 'ייצוא CSV',
      exportPng: 'שמירת גרף PNG',
      highlightedPrefix: 'מודגש בגרף:',
      clearHighlight: 'נקה הדגשה'
    },
    insights: {
      title: 'תובנות היסטוריות והשוואת עדכונים',
      subtitle: 'מדדי ייחוס של משך פריסה ותדירות אירועים ב-12 החודשים האחרונים מתוך נתוני Google הרשמיים.',
      avgCoreDuration: 'משך פריסת Core ממוצע',
      avgSpamDuration: 'משך פריסת Spam ממוצע',
      avgCadence: 'פער ממוצע בין עדכונים',
      daysSinceLast: 'מאז העדכון האחרון',
      daysUnit: 'ימים',
      noCompletedData: 'אין נתונים',
      monthlyTitle: 'התפלגות אירועים ב-12 החודשים האחרונים',
      legendCore: 'Core / Discover',
      legendSpam: 'Spam',
      legendSystem: 'מערכת ותשתית',
      noIncidentsMonth: 'ללא אירועים'
    },
    drawer: {
      title: 'ציר זמן מפורט של האירוע',
      durationLabel: 'משך כולל',
      startLabel: 'התחלה',
      endLabel: 'סיום',
      ongoingLabel: 'פעיל כעת',
      serviceLabel: 'שירות',
      statusLabel: 'סטטוס',
      highlightOnChart: 'הדגש טווח בגרף',
      highlightedOnChart: 'מודגש בגרף',
      updatesTimelineTitle: 'היסטוריית עדכוני הסטטוס הרשמיים',
      updatesCount: 'עדכונים',
      prevIncident: 'הקודם',
      nextIncident: 'הבא',
      close: 'סגור',
      daysShort: 'י׳',
      hoursShort: 'ש׳',
      viewTimelineBtn: 'ציר זמן'
    },
    checklist: {
      title: 'צ׳קליסט אבחון ירידת תנועה (SEO)',
      subtitle: 'סדר פעולות מובנה לבדיקת ירידות אורגניות לפני ביצוע שינויים חפוזים באתר.',
      activeBanner: 'קיים כעת עדכון אלגוריתם או תקלת מערכת פעילה של Google. מומלץ להימנע משינויים דרסטיים עד לסיום הפריסה.',
      calmBanner: 'לא מדווחת כרגע פריסת עדכון פעילה מצד Google. שינויים בדירוגים נובעים לרוב מגורמים באתר או מהמתחרים.',
      progressLabel: 'הושלמו',
      resetBtn: 'איפוס סימונים',
      phases: {
        attribution: 'תזמון ושיוך',
        technical: 'תשתית ואינדוקס',
        content: 'איכות תוכן וספאם',
        intent: 'כוונת חיפוש ומתחרים'
      },
      items: [
        {
          id: 'attr-dates',
          phase: 'attribution',
          title: 'הצלבת תאריכי הירידה מול חלון העדכון בגרף',
          desc: 'בדקו ב-Google Search Console האם הירידה בקליקים ובחשיפות תואמת בדיוק לתאריכי תחילת הפריסה.'
        },
        {
          id: 'attr-wait',
          phase: 'attribution',
          title: 'המתנה להשלמת הפריסה לפני שינויים רוחביים',
          desc: 'במהלך עדכון Core או Spam פעיל המיקומים ממשיכים לנוע; שינויים מוקדמים מקשים על בידוד הסיבה.'
        },
        {
          id: 'tech-gsc',
          phase: 'technical',
          title: 'בדיקת דוח האינדוקס ופעולות ידניות ב-GSC',
          desc: 'ודאו שלא הופיעו חסימות robots.txt, תגיות noindex שגויות, שינויי canonical או עונשים ידניים.'
        },
        {
          id: 'tech-crawl',
          phase: 'technical',
          title: 'בדיקת שגיאות שרת (5xx), זמני תגובה וזחילת Googlebot',
          desc: 'אמתו שתקלות Crawling או Serving לא חסמו גישה לדפים מרכזיים או יצרו איטיות חריגה.'
        },
        {
          id: 'content-eeat',
          phase: 'content',
          title: 'סקירת עומק התוכן ומדדי E-E-A-T בדפים שנפגעו',
          desc: 'בדקו האם הדפים שנחלשו מספקים ערך מוסף מקורי, ניסיון מעשי ומבנה ברור לעומת תוכן שטחי.'
        },
        {
          id: 'content-spam',
          phase: 'content',
          title: 'בדיקת פרופיל קישורים, תוכן משוכפל ועומס פרסומות',
          desc: 'בעדכוני ספאם יש לוודא היעדר תבניות ספאם, דפי מעבר או חוויית משתמש עמוסת מודעות מעל הקפל.'
        },
        {
          id: 'intent-serp',
          phase: 'intent',
          title: 'ניתוח תוצאות החיפוש (SERP) והמתחרים שעלו',
          desc: 'בדקו אילו אתרים עלו במקומכם והאם הופיעו רכיבים חדשים (AI Overviews, וידאו, פורומים) שמשכו הקלקות.'
        }
      ]
    },
    csvHeaders: {
      date: 'תאריך',
      volatility: 'מדד תנודתיות (%)',
      movingAvg: 'ממוצע נע 7 ימים (%)',
      incidentCount: 'מספר אירועים פעילים',
      incidents: 'פירוט אירועים'
    }
  },
  ru: {
    chartControls: {
      movingAvgToggle: 'Среднее 7д',
      movingAvgLabel: 'Скользящее ср. (7д)',
      exportCsv: 'Экспорт CSV',
      exportPng: 'График PNG',
      highlightedPrefix: 'Выделено:',
      clearHighlight: 'Сбросить'
    },
    insights: {
      title: 'Историческая аналитика и сравнение обновлений',
      subtitle: 'Средние сроки раскатки и распределение инцидентов за последние 12 месяцев по официальным данным Google.',
      avgCoreDuration: 'Ср. длительность Core',
      avgSpamDuration: 'Ср. длительность Spam',
      avgCadence: 'Средний интервал',
      daysSinceLast: 'С последнего апдейта',
      daysUnit: 'дн.',
      noCompletedData: 'Нет данных',
      monthlyTitle: 'Активность за 12 месяцев',
      legendCore: 'Core / Discover',
      legendSpam: 'Spam',
      legendSystem: 'Система',
      noIncidentsMonth: 'Нет событий'
    },
    drawer: {
      title: 'Хронология события',
      durationLabel: 'Длительность',
      startLabel: 'Начало',
      endLabel: 'Завершение',
      ongoingLabel: 'Активно сейчас',
      serviceLabel: 'Сервис',
      statusLabel: 'Статус',
      highlightOnChart: 'Выделить на графике',
      highlightedOnChart: 'Выделено на графике',
      updatesTimelineTitle: 'Официальные обновления статуса',
      updatesCount: 'сообщ.',
      prevIncident: 'Предыдущее',
      nextIncident: 'Следующее',
      close: 'Закрыть',
      daysShort: 'д',
      hoursShort: 'ч',
      viewTimelineBtn: 'Хронология'
    },
    checklist: {
      title: 'Чек-лист диагностики падения трафика (SEO)',
      subtitle: 'Пошаговая проверка сайта во время штормов алгоритма до внесения резких правок.',
      activeBanner: 'Сейчас активно обновление алгоритма или сбой Google. Воздержитесь от поспешных изменений до завершения раскатки.',
      calmBanner: 'Активных обновлений Google сейчас нет. Колебания позиций вероятнее связаны с сайтом или конкурентами.',
      progressLabel: 'Выполнено',
      resetBtn: 'Сбросить',
      phases: {
        attribution: 'Тайминг и атрибуция',
        technical: 'Техника и индексация',
        content: 'Контент и спам-факторы',
        intent: 'Выдача и интент'
      },
      items: [
        {
          id: 'attr-dates',
          phase: 'attribution',
          title: 'Сопоставить даты просадки с окном обновления на графике',
          desc: 'Проверьте в Google Search Console совпадение даты падения кликов и показов с началом раскатки.'
        },
        {
          id: 'attr-wait',
          phase: 'attribution',
          title: 'Дождаться окончания раскатки перед крупными правками',
          desc: 'Во время активного Core или Spam обновления позиции нестабильны; преждевременные правки искажают картину.'
        },
        {
          id: 'tech-gsc',
          phase: 'technical',
          title: 'Проверить индексацию и ручные санкции в Search Console',
          desc: 'Исключите ошибки robots.txt, случайные теги noindex, проблемы canonical и ручные меры.'
        },
        {
          id: 'tech-crawl',
          phase: 'technical',
          title: 'Проверить ответы сервера (5xx) и логи сканирования Googlebot',
          desc: 'Убедитесь, что сбои Crawling или Serving не затронули доступность ключевых страниц.'
        },
        {
          id: 'content-eeat',
          phase: 'content',
          title: 'Проверить глубину контента и сигналы E-E-A-T на пострадавших URL',
          desc: 'Оцените уникальность, практическую экспертизу и полноту ответа на запрос пользователя.'
        },
        {
          id: 'content-spam',
          phase: 'content',
          title: 'Проверить ссылочный профиль и плотность рекламы',
          desc: 'При Spam Update проверьте отсутствие дорвеев, навязчивой рекламы и манипулятивных ссылок.'
        },
        {
          id: 'intent-serp',
          phase: 'intent',
          title: 'Изучить изменившийся состав выдачи (SERP) и конкурентов',
          desc: 'Проверьте, какие сайты выросли и не сместились ли клики в блоки AI Overviews, видео или форумы.'
        }
      ]
    },
    csvHeaders: {
      date: 'Дата',
      volatility: 'Волатильность (%)',
      movingAvg: 'Среднее 7д (%)',
      incidentCount: 'Активные события',
      incidents: 'Детали событий'
    }
  }
};
