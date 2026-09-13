/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, NormalizedIncident, ServicesKeys, VolatilityPoint } from './types';

// Structured offline high-fidelity local database representing major Google incidents and Core Updates (2025 - 2026)
export interface OfflineIncident {
  id: string;
  service: ServicesKeys;
  begin: string; // ISO Date String
  end: string | null; // ISO Date String
  isCoreUpdate: boolean;
  descriptions: {
    en: string;
    he: string;
    ru: string;
  };
}

export const OFFLINE_INCIDENTS: OfflineIncident[] = [
  {
    id: 'wdAXJk6LRRihEjpzEeWE',
    service: 'Ranking',
    begin: '2026-05-21T15:40:00+00:00',
    end: null,
    isCoreUpdate: true,
    descriptions: {
      en: 'May 2026 core update: Released the May 2026 core update. The rollout may take up to 2 weeks to complete.',
      he: 'עדכון ליבה מאי 2026: שוחרר עדכון הליבה של מאי 2026. פריסת העדכון עשויה להמשך עד שבועיים.',
      ru: 'Обновление основного алгоритма за май 2026 года: Выпущено основное обновление за май 2026 года. Развертывание может занять до 2 недель.'
    }
  },
  {
    id: '7eTbAa2jWdToLkraZj5y',
    service: 'Ranking',
    begin: '2026-03-27T09:00:00+00:00',
    end: '2026-04-08T13:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'March 2026 core update: Released the March 2026 core update. The rollout was complete as of April 8, 2026.',
      he: 'עדכון ליבה מרץ 2026: שוחרר עדכון הליבה של מרץ 2026. הפריסה הושלמה ב-8 באפריל 2026.',
      ru: 'Обновление основного алгоритма за март 2026 года: Выпущено основное обновление за март 2026 года. Развертывание завершено 8 апреля 2026 года.'
    }
  },
  {
    id: 'VbnSXAH4SmEcxPtx4YSD',
    service: 'Ranking',
    begin: '2026-03-24T19:00:00+00:00',
    end: '2026-03-25T14:30:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'March 2026 spam update: Released the March 2026 spam update. The rollout was complete as of March 25, 2026.',
      he: 'עדכון ספאם מרץ 2026: שוחרר עדכון הספאם של מרץ 2026. הפריסה הושלמה ב-25 במרץ 2026.',
      ru: 'Обновление алгоритма борьбы со спамом за март 2026 года: Выпущено обновление борьбы со спамом за март 2026 года. Развертывание завершено 25 марта 2026 года.'
    }
  },
  {
    id: 'TZF4pLmbzFdoBPP6o3iv',
    service: 'Serving',
    begin: '2026-02-25T03:55:00+00:00',
    end: '2026-02-25T04:10:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Serving experienced an issue with serving search results. The issue was quickly resolved.',
      he: 'תקלת הגשת תוצאות (Serving): נרשמה תקלה זמנית בהצגת תוצאות חיפוש. התקלה נפתרה בהצלחה.',
      ru: 'Сбой в системе выдачи (Serving): Кратковременный сбой при отображении результатов поиска. Проблема оперативно устранена.'
    }
  },
  {
    id: 'mYbNTqV1ytDc2fA8hUz4',
    service: 'Ranking',
    begin: '2026-02-05T17:00:00+00:00',
    end: '2026-02-27T10:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'February 2026 Discover update: Released the February 2026 Discover core update for English language users in the US. The rollout was complete as of February 27, 2026.',
      he: 'עדכון Discover פברואר 2026: שוחרר עדכון אלגוריתם המלצות התוכן ב-Google Discover. הפריסה הושלמה במלואה ב-27 בפברואר 2026.',
      ru: 'Обновление алгоритма Discover за февраль 2026 года: Выпущено обновление алгоритма рекомендаций Google Discover. Развертывание полностью завершено 27 февраля 2026 года.'
    }
  },
  {
    id: 'DsirqJ1gpPRgVQeccPRv',
    service: 'Ranking',
    begin: '2025-12-11T17:25:00+00:00',
    end: '2025-12-29T19:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'December 2025 core update: Released the December 2025 core update. The rollout was complete as of December 29, 2025.',
      he: 'עדכון ליבה דצמבר 2025: שוחרר עדכון הליבה של דצמבר 2025. הפריסה הושלמה במלואה ב-29 בדצמבר 2025.',
      ru: 'Обновление основного алгоритма за декабрь 2025 года: Выпущено основное обновление за декабрь 2025 года. Развертывание полностью завершено 29 декабря 2025 года.'
    }
  },
  {
    id: 'pW6WN7Ymo49q7z8pKk9w',
    service: 'Serving',
    begin: '2025-10-03T20:00:00+00:00',
    end: '2025-10-06T20:40:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Serving experienced an issue. There was an ongoing data center issue that impacted serving of some pages in some locales.',
      he: 'תקלת הגשת תוצאות (Serving): תקלה במרכז נתונים שהשפיעה על הצגת דפים באזורים מסוימים. נפתרה ב-6 באוקטובר 2025.',
      ru: 'Сбой в системе выдачи (Serving): Сбой в дата-центре повлиял на отображение страниц в ряде регионов. Устранено 6 октября 2025 года.'
    }
  },
  {
    id: 'a7Aainy6E9rZsmfq82xt',
    service: 'Ranking',
    begin: '2025-08-26T16:00:00+00:00',
    end: '2025-09-22T07:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'August 2025 spam update: Released the August 2025 spam update. The rollout was complete as of September 22, 2025.',
      he: 'עדכון ספאם אוגוסט 2025: שוחרר עדכון הספאם של אוגוסט 2025. הפריסה הושלמה במלואה ב-22 בספטמבר 2025.',
      ru: 'Обновление алгоритма борьбы со спамом за август 2025 года: Выпущено обновление борьбы со спамом за август 2025 года. Развертывание завершено 22 сентября 2025 года.'
    }
  },
  {
    id: 'riq1AuqETW46NfBCe5NT',
    service: 'Ranking',
    begin: '2025-06-30T14:30:00+00:00',
    end: '2025-07-17T08:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'June 2025 core update: Released the June 2025 core update. The rollout was complete as of July 17, 2025.',
      he: 'עדכון ליבה יוני 2025: שוחרר עדכון הליבה של יוני 2025. הפריסה הושלמה במלואה ב-17 ביולי 2025.',
      ru: 'Обновление основного алгоритма за июнь 2025 года: Выпущено основное обновление за июнь 2025 года. Развертывание завершено 17 июля 2025 года.'
    }
  },
  {
    id: 'rX6zGEp9vJJxxrY16g4A',
    service: 'Indexing',
    begin: '2025-06-12T23:54:00+00:00',
    end: '2025-06-13T05:15:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Indexing issue: Confirmed slower than usual indexing times for fresh content in Google Search.',
      he: 'תקלת אינדוקס (Indexing): איטיות ועיכובים באינדוקס תוכן חדש ב-Google Search. התקלה תוקנה במלואה.',
      ru: 'Сбой индексации (Indexing): Задержки при индексации свежего контента в Google Search. Проблема устранена в полном объеме.'
    }
  },
  {
    id: 'wNcefVMLpVGGoFLzgMEg',
    service: 'Serving',
    begin: '2025-06-12T18:00:00+00:00',
    end: '2025-06-12T20:30:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: "Serving issue: Confirmed ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users.",
      he: 'תקלת הגשת תוצאות (Serving): תקלה זמנית בהצגת תוצאות ב-Google Lens, Discover וחיפוש קולי עבור משתמשים מסוימים.',
      ru: 'Сбой в системе выдачи (Serving): Проблема с отображением результатов в Google Объектив (Lens), Discover и голосовом поиске.'
    }
  }
];

/**
 * Returns a deterministic pseudo-random baseline volatility (usually 6% - 29%)
 * for simple un-spiked quiet days.
 */
export function getDeterministicBaseline(date: Date): number {
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  // Safe hash value
  const seed = (d * 37 + m * 79 + y * 13) % 1000;
  // Sin/cos waves overlay
  const x = (seed * Math.PI) / 180;
  const base = 17;
  const wave = Math.sin(x) * 6.5 + Math.cos(x * 1.6) * 3.5 + Math.sin(x * 3.2) * 1.5;
  return Math.max(4, Math.min(29, Number((base + wave).toFixed(1))));
}

/**
 * Custom algorithmic model to project volatility index (0% - 100%)
 * Spikes volatility during active incidents (65% - 95%)
 */
export function calculateVolatility(date: Date, activeIncidents: NormalizedIncident[]): number {
  const baseline = getDeterministicBaseline(date);
  if (activeIncidents.length === 0) {
    return baseline;
  }

  let maxBoost = 0;
  activeIncidents.forEach(inc => {
    let boost = 25;
    if (inc.isCoreUpdate) {
      boost = 58;
    } else if (inc.service === 'Ranking') {
      boost = 42;
    } else if (inc.service === 'Indexing') {
      boost = 36;
    } else if (inc.service === 'Serving') {
      boost = 22;
    } else if (inc.service === 'Crawling') {
      boost = 18;
    }
    if (boost > maxBoost) maxBoost = boost;
  });

  const dateSeed = date.getDate();
  const noise = (dateSeed * 13) % 13 - 6; // -6% to +6% to keep dynamic curves
  let finalVal = baseline + maxBoost + noise;

  const hasCore = activeIncidents.some(i => i.isCoreUpdate);
  if (hasCore) {
    if (finalVal < 74) finalVal = 74 + (dateSeed % 14);
    if (finalVal > 98) finalVal = 98 - (dateSeed % 5);
  } else {
    if (finalVal < 45) finalVal = 45 + (dateSeed % 12);
    if (finalVal > 73) finalVal = 73 - (dateSeed % 6);
  }

  return Number(finalVal.toFixed(1));
}

/**
 * Translates incident titles/updates into Hebrew and Russian dynamically
 */
export function translateTextAuto(text: string, lang: Language): string {
  if (lang === 'en') return text;

  let translated = text;

  // Hebrew Translation Mapping
  if (lang === 'he') {
    const heMap: Array<[RegExp, string]> = [
      [/Released the May 2026 core update/gi, 'שוחרר עדכון הליבה של מאי 2026'],
      [/Released the March 2026 core update/gi, 'שוחרר עדכון הליבה של מרץ 2026'],
      [/Released the March 2026 spam update/gi, 'שוחרר עדכון הספאם של מרץ 2026'],
      [/Released the February 2026 Discover core update/gi, 'שוחרר עדכון אלגוריתם Discover של פברואר 2026'],
      [/Released the December 2025 core update/gi, 'שוחרר עדכון הליבה של דצמבר 2025'],
      [/Released the August 2025 spam update/gi, 'שוחרר עדכון הספאם של אוגוסט 2025'],
      [/Released the June 2025 core update/gi, 'שוחרר עדכון הליבה של יוני 2025'],
      
      [/May 2026 core update/gi, 'עדכון ליבה מאי 2026'],
      [/March 2026 core update/gi, 'עדכון ליבה מרץ 2026'],
      [/March 2026 spam update/gi, 'עדכון ספאם מרץ 2026'],
      [/February 2026 Discover update/gi, 'עדכון Discover פברואר 2026'],
      [/December 2025 core update/gi, 'עדכון ליבה דצמבר 2025'],
      [/August 2025 spam update/gi, 'עדכון ספאם אוגוסט 2025'],
      [/June 2025 core update/gi, 'עדכון ליבה יוני 2025'],

      [/The rollout may take up to 2 weeks to complete/gi, 'הפריסה עשויה להימשך עד שבועיים'],
      [/The rollout was complete as of April 8, 2026/gi, 'הפריסה הושלמה במלואה ב-8 באפריל 2026'],
      [/The rollout was complete as of March 25, 2026/gi, 'הפריסה הושלמה במלואה ב-25 במרץ 2026'],
      [/The rollout was complete as of February 27, 2026/gi, 'הפריסה הושלמה במלואה ב-27 בפברואר 2026'],
      [/The rollout was complete as of December 29, 2025/gi, 'הפריסה הושלמה במלואה ב-29 בדצמבר 2025'],
      [/The rollout was complete as of September 22, 2025/gi, 'הפריסה הושלמה במלואה ב-22 בספטמבר 2025'],
      [/The rollout was complete as of July 17, 2025/gi, 'הפריסה הושלמה במלואה ב-17 ביולי 2025'],
      [/The rollout may take a few days to complete/gi, 'הפריסה עשויה להימשך מספר ימים'],
      [/The rollout may take up to 3 weeks to complete/gi, 'הפריסה עשויה להימשך עד 3 שבועות'],

      [/Serving was experiencing an issue/gi, 'נרשמה תקלה במערכת הגשת התוצאות (Serving)'],
      [/We fixed the issue with serving search results. There will be no more updates/gi, 'תוקנה התקלה בהגשת תוצאות החיפוש. לא יפורסמו עדכונים נוספים בנושא'],
      [/Serving experienced an issue/gi, 'נרשמה תקלה במערכת הגשת התוצאות (Serving)'],
      [/The issue with serving has resolved itself. There will be no more updates/gi, 'התקלה במערכת הגשת התוצאות נפתרה. לא יפורסמו עדכונים נוספים בנושא'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales. We're working on identifying the root cause/gi, 'קיימת תקלה מתמשכת במרכז נתונים שעשויה להשפיע על הגשת דפים מסוימים באזורים מסוימים. אנו פועלים לזיהוי ופתרון סיבת השורש'],
      [/There was an issue with indexing fresh content in Google Search. Sites may have experienced slower than usual indexing times/gi, 'נרשמה תקלה באינדוקס תוכן חדש ב-Google Search. אתרים עשויים היו לחוות זמני אינדוקס איטיים מהרגיל'],
      [/We fixed the issue with indexing fresh content. There will be no more updates/gi, 'תוקנה התקלה באינדוקס תוכן חדש. לא יפורסמו עדכונים נוספים בנושא'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users. We're working on identifying the root cause/gi, 'קיימת תקלה מתמשכת בהגשת תוצאות ב-Google Lens, Discover ובחיפוש קולי המשפיעה על חלק מהמשתמשים. אנו פועלים לבירור סיבת השורש'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search. There will be no more updates/gi, 'תוקנה תקלת ההגשה ב-Google Lens, Discover ובחיפוש קולי. לא יפורסמו עדכונים נוספים בנושא'],

      [/released/gi, 'שוחרר'],
      [/rollout/gi, 'פריסה'],
      [/complete as of/gi, 'הושלם החל מ-'],
      [/complete/gi, 'הושלם'],
      [/indexing issue/gi, 'תקלת אינדוקס (Indexing)'],
      [/serving issue/gi, 'תקלת הגשת תוצאות (Serving)'],
      [/ranking issue/gi, 'תקלת דירוג (Ranking)'],
      [/crawling issue/gi, 'תקלת סריקה וזחילה (Crawling)']
    ];

    for (const [regex, replacement] of heMap) {
      translated = translated.replace(regex, replacement);
    }
  }

  // Russian Translation Mapping
  if (lang === 'ru') {
    const ruMap: Array<[RegExp, string]> = [
      [/Released the May 2026 core update/gi, 'Выпущено основное обновление алгоритма (Core Update) за май 2026 года'],
      [/Released the March 2026 core update/gi, 'Выпущено основное обновление алгоритма (Core Update) за март 2026 года'],
      [/Released the March 2026 spam update/gi, 'Выпущено обновление алгоритма борьбы со спамом за март 2026 года'],
      [/Released the February 2026 Discover core update/gi, 'Выпущено обновление алгоритма рекомендаций Discover за февраль 2026 года'],
      [/Released the December 2025 core update/gi, 'Выпущено основное обновление алгоритма (Core Update) за декабрь 2025 года'],
      [/Released the August 2025 spam update/gi, 'Выпущено обновление алгоритма борьбы со спамом за август 2025 года'],
      [/Released the June 2025 core update/gi, 'Выпущено основное обновление алгоритма (Core Update) за июнь 2025 года'],
      
      [/May 2026 core update/gi, 'Обновление основного алгоритма за май 2026 года'],
      [/March 2026 core update/gi, 'Обновление основного алгоритма за март 2026 года'],
      [/March 2026 spam update/gi, 'Обновление алгоритма борьбы со спамом за март 2026 года'],
      [/February 2026 Discover update/gi, 'Обновление Discover за февраль 2026 года'],
      [/December 2025 core update/gi, 'Обновление основного алгоритма за декабрь 2025 года'],
      [/August 2025 spam update/gi, 'Обновление алгоритма борьбы со спамом за август 2025 года'],
      [/June 2025 core update/gi, 'Обновление основного алгоритма за июнь 2025 года'],

      [/The rollout may take up to 2 weeks to complete/gi, 'Развертывание обновления может занять до 2 недель'],
      [/The rollout was complete as of April 8, 2026/gi, 'Развертывание полностью завершено 8 апреля 2026 года'],
      [/The rollout was complete as of March 25, 2026/gi, 'Развертывание полностью завершено 25 марта 2026 года'],
      [/The rollout was complete as of February 27, 2026/gi, 'Развертывание полностью завершено 27 февраля 2026 года'],
      [/The rollout was complete as of December 29, 2025/gi, 'Развертывание полностью завершено 29 декабря 2025 года'],
      [/The rollout was complete as of September 22, 2025/gi, 'Развертывание полностью завершено 22 сентября 2025 года'],
      [/The rollout was complete as of July 17, 2025/gi, 'Развертывание полностью завершено 17 июля 2025 года'],
      [/The rollout may take a few days to complete/gi, 'Развертывание может занять несколько дней'],
      [/The rollout may take up to 3 weeks to complete/gi, 'Развертывание может занять до 3 недель'],

      [/Serving was experiencing an issue/gi, 'В системе выдачи результатов (Serving) наблюдался технический сбой'],
      [/We fixed the issue with serving search results. There will be no more updates/gi, 'Проблема с отображением результатов поиска устранена. Дальнейших обновлений статуса не планируется'],
      [/Serving experienced an issue/gi, 'В системе выдачи результатов (Serving) произошел сбой'],
      [/The issue with serving has resolved itself. There will be no more updates/gi, 'Сбой в системе выдачи результатов устранен. Дальнейших обновлений статуса не планируется'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales. We're working on identifying the root cause/gi, 'Зафиксирован технический сбой в дата-центре, который может влиять на выдачу страниц в некоторых регионах. Специалисты устанавливают первопричину'],
      [/There was an issue with indexing fresh content in Google Search. Sites may have experienced slower than usual indexing times/gi, 'Возник сбой при индексации свежего контента в Google Search. Сайты могли испытывать задержки при индексации'],
      [/We fixed the issue with indexing fresh content. There will be no more updates/gi, 'Проблема с индексацией свежего контента полностью устранена. Дальнейших сообщений не планируется'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users. We're working on identifying the root cause/gi, 'Зафиксирован сбой в работе сервисов Google Lens, Discover и голосового поиска. Ведутся работы по устранению первопричины'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search. There will be no more updates/gi, 'Проблема с отображением результатов в Google Lens, Discover и голосовом поиске устранена. Дальнейших сообщений не планируется'],

      [/released/gi, 'Выпущено'],
      [/rollout/gi, 'развертывание'],
      [/complete as of/gi, 'завершено на момент'],
      [/complete/gi, 'завершено'],
      [/indexing issue/gi, 'сбой индексации (Indexing)'],
      [/serving issue/gi, 'сбой выдачи результатов (Serving)'],
      [/ranking issue/gi, 'сбой ранжирования (Ranking)'],
      [/crawling issue/gi, 'сбой сканирования (Crawling)']
    ];

    for (const [regex, replacement] of ruMap) {
      translated = translated.replace(regex, replacement);
    }
  }

  return translated;
}

/**
 * Normalization pipeline mapping raw incident anomalies safely
 */
export function normalizeIncident(raw: any, lang: Language): NormalizedIncident {
  const id = raw.id || `incident-${Math.random()}`;
  
  // Normalized Title/Description from correct Google statuses keys
  const title = raw.external_desc || raw.external_description || raw.description || raw.summary || 'Google Search Operations Adjustment';
  
  let updateText = '';
  if (raw.updates && Array.isArray(raw.updates) && raw.updates.length > 0) {
    updateText = raw.updates.map((u: any) => u.text).join('\n— ');
  } else if (raw.most_recent_update && raw.most_recent_update.text) {
    updateText = raw.most_recent_update.text;
  }
  
  const desc = updateText ? `${title}: ${updateText}` : title;

  // Premium translation dictionary / fallback mapping
  const offlineMatch = OFFLINE_INCIDENTS.find(o => o.id === id);
  let finalDesc = desc;
  if (offlineMatch) {
    finalDesc = offlineMatch.descriptions[lang] || offlineMatch.descriptions['en'];
  } else {
    finalDesc = translateTextAuto(desc, lang);
  }

  // Parse fields using real Google keys
  let service: ServicesKeys = 'General';
  const rawService = String(raw.service_name || raw.service || raw.source || 'General').toLowerCase();
  
  if (rawService.includes('rank')) service = 'Ranking';
  else if (rawService.includes('index')) service = 'Indexing';
  else if (rawService.includes('serv')) service = 'Serving';
  else if (rawService.includes('crawl')) service = 'Crawling';

  const beginStr = raw.begin || raw.start_time;
  const endStr = raw.end || raw.end_time || raw.resolved;

  const isCoreUpdate = title.toLowerCase().includes('core update') || 
                       title.toLowerCase().includes('spam update') || 
                       title.toLowerCase().includes('helpful content') ||
                       desc.toLowerCase().includes('core update') ||
                       desc.toLowerCase().includes('spam update') ||
                       desc.toLowerCase().includes('helpful content');

  return {
    id,
    description: finalDesc,
    service,
    begin: beginStr ? new Date(beginStr) : new Date(),
    end: endStr ? new Date(endStr) : null,
    status: raw.status === 'active' || !endStr ? 'active' : 'resolved',
    isCoreUpdate
  };
}

/**
 * Integrates localized descriptors into NormalizedIncidents when fallback occurs
 */
export function getOfflineIncidents(lang: Language): NormalizedIncident[] {
  return OFFLINE_INCIDENTS.map(inc => ({
    id: inc.id,
    description: inc.descriptions[lang] || inc.descriptions['en'],
    service: inc.service,
    begin: new Date(inc.begin),
    end: inc.end ? new Date(inc.end) : null,
    status: inc.end ? 'resolved' : 'active',
    isCoreUpdate: inc.isCoreUpdate
  }));
}

/**
 * Ingestion layer for Google Search Status Dashboard API.
 * ZERO PROXY ARCHITECTURE:
 * 1. Tries direct browser connection to official https://status.search.google.com/incidents.json
 * 2. Tries same-origin static incidents.json (populated directly from official Google API by GitHub Actions daily workflow)
 * 3. Falls back safely to offline incidents database cache if network unreachable.
 */
export async function fetchGoogleIncidents(
  lang: Language,
  onStateUpdate: (state: 'loading' | 'direct' | 'synced' | 'usingLocal') => void
): Promise<NormalizedIncident[]> {
  const officialGoogleUrl = 'https://status.search.google.com/incidents.json';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const staticWorkflowUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}incidents.json?t=${Date.now()}`;

  // State 1: Loading
  onStateUpdate('loading');

  // Attempt 1: Direct official Google API (no proxies)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // Quick check

    const directResponse = await fetch(officialGoogleUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (directResponse.ok) {
      const rawArray = await directResponse.json();
      if (Array.isArray(rawArray) && rawArray.length > 0) {
        onStateUpdate('direct');
        return rawArray.map(item => normalizeIncident(item, lang));
      }
    }
  } catch (_corsOrNetworkErr) {
    // Normal in standard browsers because Google does not return Access-Control-Allow-Origin headers
  }

  // Attempt 2: Same-origin incidents.json populated directly from official Google API by GitHub Actions workflow
  try {
    const staticResponse = await fetch(staticWorkflowUrl);
    if (staticResponse.ok) {
      const rawArray = await staticResponse.json();
      if (Array.isArray(rawArray) && rawArray.length > 0) {
        onStateUpdate('synced');
        return rawArray.map(item => normalizeIncident(item, lang));
      }
    }
  } catch (err) {
    console.warn('[Google Tracker] Workflow-synced incidents.json unavailable:', err);
  }

  // Attempt 3: Local offline dataset fallback
  onStateUpdate('usingLocal');
  return getOfflineIncidents(lang);
}

/**
 * Compiles absolute chronology of points (dates mapped with volatility scores and incidents details)
 */
export function compileTimeline(
  days: number,
  incidents: NormalizedIncident[],
  currentDate: Date = new Date() // Current real-world timestamp
): VolatilityPoint[] {
  const points: VolatilityPoint[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(currentDate);
    d.setUTCDate(currentDate.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);

    // List the official incidents active during *this* date
    const activeIncidents = incidents.filter(inc => {
      const beginDay = new Date(inc.begin);
      beginDay.setUTCHours(0,0,0,0);
      
      const endDay = inc.end ? new Date(inc.end) : null;
      if (endDay) endDay.setUTCHours(23,59,59,999);

      if (endDay) {
        return d >= beginDay && d <= endDay;
      } else {
        // Active/Ongoing incident
        return d >= beginDay;
      }
    });

    const metricValue = calculateVolatility(d, activeIncidents);

    // Dynamic formatting for labels
    const dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    points.push({
      date: d,
      dateStr,
      metricValue,
      incidentCount: activeIncidents.length,
      incidents: activeIncidents
    });
  }

  return points;
}
