/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HistoricalInsights,
  IncidentCategory,
  IncidentUpdate,
  Language,
  MonthlyIncidentBucket,
  NormalizedIncident,
  ServicesKeys,
  VolatilityPoint
} from './types';

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
    id: 'XhUDXP7A67iHCD2kmbVu',
    service: 'Ranking',
    begin: '2026-09-24T16:15:00+00:00',
    end: null,
    isCoreUpdate: true,
    descriptions: {
      en: 'September 2026 spam update: Released the September 2026 spam update, which applies globally and to all languages. The rollout may take up to two weeks to complete.',
      he: 'עדכון ספאם ספטמבר 2026: שוחרר עדכון הספאם של ספטמבר 2026, החל באופן גלובלי ובכל השפות. פריסת העדכון עשויה להימשך עד שבועיים.',
      ru: 'Обновление алгоритма борьбы со спамом за сентябрь 2026 года: Выпущено обновление алгоритма борьбы со спамом за сентябрь 2026 года, применяемое глобально и для всех языков. Развертывание может занять до двух недель.'
    }
  },
  {
    id: 'LEubPCm2octf2uMqCFKE',
    service: 'Ranking',
    begin: '2026-08-18T16:27:00+00:00',
    end: '2026-08-21T08:49:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'August 2026 spam update: The rollout was complete as of August 21, 2026. Released the August 2026 spam update, which applies globally and to all languages. The rollout may take a few days to complete.',
      he: 'עדכון ספאם אוגוסט 2026: הפריסה הושלמה במלואה ב-21 באוגוסט 2026. שוחרר עדכון הספאם של אוגוסט 2026, החל באופן גלובלי ובכל השפות. פריסת העדכון עשויה להימשך מספר ימים.',
      ru: 'Обновление алгоритма борьбы со спамом за август 2026 года: Развертывание полностью завершено 21 августа 2026 года. Выпущено обновление алгоритма борьбы со спамом за август 2026 года, применяемое глобально и для всех языков. Развертывание заняло несколько дней.'
    }
  },
  {
    id: 'YUX1peHev5a4fkxLDiUQ',
    service: 'Ranking',
    begin: '2026-06-24T16:00:00+00:00',
    end: '2026-06-26T17:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'June 2026 spam update: The rollout was complete as of June 26, 2026. Released the June 2026 spam update, which applies globally and to all languages. The rollout may take a few days to complete.',
      he: 'עדכון ספאם יוני 2026: הפריסה הושלמה במלואה ב-26 ביוני 2026. שוחרר עדכון הספאם של יוני 2026, החל באופן גלובלי ובכל השפות. פריסת העדכון עשויה להימשך מספר ימים.',
      ru: 'Обновление алгоритма борьбы со спамом за июнь 2026 года: Развертывание полностью завершено 26 июня 2026 года. Выпущено обновление алгоритма борьбы со спамом за июнь 2026 года, применяемое глобально и для всех языков. Развертывание заняло несколько дней.'
    }
  },
  {
    id: 'wdAXJk6LRRihEjpzEeWE',
    service: 'Ranking',
    begin: '2026-05-21T15:40:00+00:00',
    end: '2026-06-02T12:40:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'May 2026 core update: The rollout was complete as of June 2, 2026. Released the May 2026 core update. The rollout may take up to 2 weeks to complete.',
      he: 'עדכון ליבה מאי 2026: הפריסה הושלמה במלואה ב-2 ביוני 2026. שוחרר עדכון הליבה של מאי 2026. פריסת העדכון עשויה להימשך עד שבועיים.',
      ru: 'Обновление основного алгоритма за май 2026 года: Развертывание полностью завершено 2 июня 2026 года. Выпущено основное обновление за май 2026 года. Развертывание заняло до 2 недель.'
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


function getIncidentBaseBoost(inc: NormalizedIncident): number {
  if (inc.isCoreUpdate) {
    if (inc.category === 'core') return 58;
    if (inc.category === 'discover') return 54;
    if (inc.category === 'spam') return 52;
    return 55;
  }
  if (inc.service === 'Ranking') return 42;
  if (inc.service === 'Indexing') return 36;
  if (inc.service === 'Serving') return 22;
  if (inc.service === 'Crawling') return 18;
  return 25;
}

/**
 * Enhanced natural volatility model:
 * - Pre-update algorithmic tremors (1-2 days prior to Core/Spam rollouts)
 * - Gradual rollout ramp-up instead of abrupt rectangular cliffs
 * - Diminishing-weight compounding when multiple incidents overlap
 * - Smooth 3-day post-rollout decay cooldown
 */
export function calculateNaturalVolatility(
  date: Date,
  allIncidents: NormalizedIncident[],
  activeIncidents: NormalizedIncident[],
  referenceNow: Date = new Date()
): number {
  const baseline = getDeterministicBaseline(date);
  const dayMs = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const todayMs = Date.UTC(
    referenceNow.getUTCFullYear(),
    referenceNow.getUTCMonth(),
    referenceNow.getUTCDate()
  );

  const effectiveBoosts: number[] = [];
  let maxPlateauFactor = 0;

  for (const inc of allIncidents) {
    const b = inc.begin;
    const beginMs = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
    const e = inc.end;
    const endMs = e
      ? Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
      : todayMs;

    const baseBoost = getIncidentBaseBoost(inc);

    if (dayMs >= beginMs && dayMs <= endMs) {
      const daysSinceBegin = Math.round((dayMs - beginMs) / 86400000);
      const totalSpanDays = Math.max(1, Math.round((endMs - beginMs) / 86400000) + 1);

      let ramp = 1;
      if (totalSpanDays > 2) {
        if (daysSinceBegin === 0) ramp = 0.68;
        else if (daysSinceBegin === 1) ramp = 0.9;
        else ramp = 1;

        if (inc.end && totalSpanDays >= 5 && dayMs === endMs) {
          ramp = Math.min(ramp, 0.86);
        }
      }

      effectiveBoosts.push(baseBoost * ramp);
      if (inc.isCoreUpdate && ramp > maxPlateauFactor) {
        maxPlateauFactor = ramp;
      }
    } else if (dayMs < beginMs && inc.isCoreUpdate) {
      const daysBefore = Math.round((beginMs - dayMs) / 86400000);
      if (daysBefore === 1) effectiveBoosts.push(12);
      else if (daysBefore === 2) effectiveBoosts.push(6);
    } else if (inc.end && dayMs > endMs) {
      const daysAfter = Math.round((dayMs - endMs) / 86400000);
      if (daysAfter === 1) effectiveBoosts.push(baseBoost * 0.52);
      else if (daysAfter === 2) effectiveBoosts.push(baseBoost * 0.27);
      else if (daysAfter === 3) effectiveBoosts.push(baseBoost * 0.12);
    }
  }

  if (effectiveBoosts.length === 0) {
    return baseline;
  }

  effectiveBoosts.sort((a, b) => b - a);
  const primary = effectiveBoosts[0];
  const secondary = effectiveBoosts
    .slice(1)
    .reduce((sum, val) => sum + val * 0.35, 0);

  const combinedBoost = Math.min(68, primary + secondary);
  const dateSeed = date.getUTCDate();
  const noise = ((dateSeed * 13 + date.getUTCMonth() * 7) % 9) - 4;
  let finalVal = baseline + combinedBoost + noise;

  const hasCore = activeIncidents.some(i => i.isCoreUpdate);
  if (hasCore && maxPlateauFactor >= 0.88) {
    if (finalVal < 72) finalVal = 72 + (dateSeed % 12);
  }

  finalVal = Math.max(4, Math.min(98, finalVal));
  return Number(finalVal.toFixed(1));
}

const MONTHS_HE: Record<string, string> = {
  january: 'ינואר', february: 'פברואר', march: 'מרץ', april: 'אפריל',
  may: 'מאי', june: 'יוני', july: 'יולי', august: 'אוגוסט',
  september: 'ספטמבר', october: 'אוקטובר', november: 'נובמבר', december: 'דצמבר'
};

const MONTHS_RU_NOM: Record<string, string> = {
  january: 'январь', february: 'февраль', march: 'март', april: 'апрель',
  may: 'май', june: 'июнь', july: 'июль', august: 'август',
  september: 'сентябрь', october: 'октябрь', november: 'ноябрь', december: 'декабрь'
};

const MONTHS_RU_GEN: Record<string, string> = {
  january: 'января', february: 'февраля', march: 'марта', april: 'апреля',
  may: 'мая', june: 'июня', july: 'июля', august: 'августа',
  september: 'сентября', october: 'октября', november: 'ноября', december: 'декабря'
};

/**
 * Translates incident titles, status updates, and descriptions into fluent,
 * natural Hebrew and Russian dynamically without fragmented word substitutions.
 */
export function translateTextAuto(text: string, lang: Language): string {
  if (lang === 'en' || !text) return text;

  let res = text.trim();

  // Hebrew Translation Engine
  if (lang === 'he') {
    // 1. Completion date patterns (e.g. "The rollout was complete as of August 21, 2026.")
    res = res.replace(/The rollout was complete(?:d)? as of ([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})\.?/gi, (_, m, d, y) => {
      const monthHe = MONTHS_HE[m.toLowerCase()] || m;
      return `הפריסה הושלמה במלואה ב-${d} ב${monthHe} ${y}.`;
    });
    res = res.replace(/The rollout was complete(?:d)? as of (\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})\.?/gi, (_, d, m, y) => {
      const monthHe = MONTHS_HE[m.toLowerCase()] || m;
      return `הפריסה הושלמה במלואה ב-${d} ב${monthHe} ${y}.`;
    });

    // 2. Release announcement patterns (e.g. "Released the September 2026 spam update")
    res = res.replace(/Released the ([A-Za-z]+)\s+(\d{4})\s+(Discover core update|Discover update|core update|spam update|reviews update|product reviews update|helpful content update)/gi, (_, m, y, type) => {
      const monthHe = MONTHS_HE[m.toLowerCase()] || m;
      const typeLower = type.toLowerCase();
      let typeHe = 'עדכון';
      if (typeLower.includes('core')) typeHe = 'עדכון ליבה';
      else if (typeLower.includes('spam')) typeHe = 'עדכון ספאם';
      else if (typeLower.includes('discover')) typeHe = 'עדכון Discover';
      else if (typeLower.includes('review')) typeHe = 'עדכון ביקורות';
      else if (typeLower.includes('helpful')) typeHe = 'עדכון תוכן מועיל';
      return `שוחרר ${typeHe} של ${monthHe} ${y}`;
    });

    // 3. Update titles (e.g. "September 2026 spam update", "May 2026 core update")
    res = res.replace(/\b([A-Za-z]+)\s+(\d{4})\s+(Discover core update|Discover update|core update|spam update|reviews update|product reviews update|helpful content update)\b/gi, (_, m, y, type) => {
      const monthHe = MONTHS_HE[m.toLowerCase()] || m;
      const typeLower = type.toLowerCase();
      let typeHe = 'עדכון';
      if (typeLower.includes('core')) typeHe = 'עדכון ליבה';
      else if (typeLower.includes('spam')) typeHe = 'עדכון ספאם';
      else if (typeLower.includes('discover')) typeHe = 'עדכון Discover';
      else if (typeLower.includes('review')) typeHe = 'עדכון ביקורות';
      else if (typeLower.includes('helpful')) typeHe = 'עדכון תוכן מועיל';
      return `${typeHe} ${monthHe} ${y}`;
    });

    // 4. Exact sentences & common status clauses
    const phrases: Array<[RegExp, string]> = [
      [/which applies globally and to all languages/gi, 'החל באופן גלובלי ובכל השפות'],
      [/The rollout may take up to two weeks to complete\.?/gi, 'הפריסה עשויה להימשך עד שבועיים.'],
      [/The rollout may take up to 2 weeks to complete\.?/gi, 'הפריסה עשויה להימשך עד שבועיים.'],
      [/The rollout may take up to 3 weeks to complete\.?/gi, 'הפריסה עשויה להימשך עד 3 שבועות.'],
      [/The rollout may take up to 4 weeks to complete\.?/gi, 'הפריסה עשויה להימשך עד 4 שבועות.'],
      [/The rollout may take a few days to complete\.?/gi, 'הפריסה עשויה להימשך מספר ימים.'],
      [/The rollout may take several weeks to complete\.?/gi, 'הפריסה עשויה להימשך מספר שבועות.'],
      [/The rollout may take up to (\d+) weeks? to complete\.?/gi, 'הפריסה עשויה להימשך עד $1 שבועות.'],
      [/The rollout is complete\.?/gi, 'הפריסה הושלמה במלואה.'],
      [/Rollout complete\.?/gi, 'הפריסה הושלמה.'],
      [/Serving was experiencing an issue\.?/gi, 'נרשמה תקלה במערכת הגשת התוצאות (Serving).'],
      [/Serving was experiencing an issue/gi, 'נרשמה תקלה במערכת הגשת התוצאות (Serving)'],
      [/Serving is experiencing an ongoing issue\.?/gi, 'קיימת תקלה מתמשכת במערכת הגשת התוצאות (Serving).'],
      [/Serving is experiencing an ongoing issue/gi, 'קיימת תקלה מתמשכת במערכת הגשת התוצאות (Serving)'],
      [/Serving experienced an issue\.?/gi, 'נרשמה תקלה במערכת הגשת התוצאות (Serving).'],
      [/Indexing was experiencing an issue\.?/gi, 'נרשמה תקלה במערכת האינדוקס (Indexing).'],
      [/Ranking was experiencing an issue\.?/gi, 'נרשמה תקלה באלגוריתם הדירוג (Ranking).'],
      [/Crawling was experiencing an issue\.?/gi, 'נרשמה תקלה בסריקה וזחילה (Crawling).'],
      [/We fixed the issue with serving search results\. There will be no more updates\.?/gi, 'תוקנה התקלה בהגשת תוצאות החיפוש. לא יפורסמו עדכונים נוספים בנושא.'],
      [/We fixed the issue with serving search results\.?/gi, 'תוקנה התקלה בהגשת תוצאות החיפוש.'],
      [/The issue with serving has resolved itself\. There will be no more updates\.?/gi, 'התקלה בהגשת תוצאות החיפוש נפתרה מעצמה. לא יפורסמו עדכונים נוספים בנושא.'],
      [/The issue with serving has resolved itself\.?/gi, 'התקלה בהגשת תוצאות החיפוש נפתרה.'],
      [/We've identified an issue with serving and have been working on a fix\.?/gi, 'זיהינו תקלה בהגשת תוצאות החיפוש ואנו פועלים לפתרונה.'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales\.?/gi, 'קיימת תקלה מתמשכת במרכז נתונים שעשויה להשפיע על הצגת דפים באזורים מסוימים.'],
      [/We're working on identifying the root cause\.?/gi, 'אנו פועלים לאיתור סיבת השורש.'],
      [/The next update will be within (\d+) hours\.?/gi, 'העדכון הבא יימסר בתוך $1 שעות.'],
      [/There will be no more updates\.?/gi, 'לא יפורסמו עדכונים נוספים בנושא.'],
      [/for English language users in the US \(will look to expand it to all countries and languages in the future\)/gi, 'עבור משתמשים בשפה האנגלית בארה״ב (מתוכננת הרחבה למדינות ושפות נוספות בעתיד)'],
      [/This update is designed to improve the quality of Discover overall\.?/gi, 'עדכון זה נועד לשפר את איכות התוכן ב-Discover באופן כללי.'],
      [/Our guidance about general core updates and Discover applies\.?/gi, 'ההנחיות הכלליות של Google לגבי עדכוני ליבה ו-Discover תקפות גם כאן.'],
      [/Our guidance about general core updates applies\.?/gi, 'ההנחיות הכלליות של Google לגבי עדכוני ליבה תקפות גם כאן.'],
      [/There was an issue with indexing fresh content in Google Search\. Sites may have experienced slower than usual indexing times\.?/gi, 'נרשמה תקלה באינדוקס תוכן חדש ב-Google Search. אתרים עשויים היו לחוות עיכובים באינדוקס.'],
      [/We fixed the issue with indexing fresh content\. There will be no more updates\.?/gi, 'תוקנה התקלה באינדוקס תוכן חדש. לא יפורסמו עדכונים נוספים בנושא.'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users\.?/gi, 'קיימת תקלה בהגשת תוצאות ב-Google Lens, Discover וחיפוש קולי המשפיעה על חלק מהמשתמשים.'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search\. There will be no more updates\.?/gi, 'תוקנה תקלת ההגשה ב-Google Lens, Discover ובחיפוש קולי. לא יפורסמו עדכונים נוספים בנושא.']
    ];

    for (const [pattern, rep] of phrases) {
      res = res.replace(pattern, rep);
    }
  }

  // Russian Translation Engine
  if (lang === 'ru') {
    // 1. Completion date patterns
    res = res.replace(/The rollout was complete(?:d)? as of ([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})\.?/gi, (_, m, d, y) => {
      const monthRu = MONTHS_RU_GEN[m.toLowerCase()] || m;
      return `Развертывание полностью завершено ${d} ${monthRu} ${y} года.`;
    });
    res = res.replace(/The rollout was complete(?:d)? as of (\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})\.?/gi, (_, d, m, y) => {
      const monthRu = MONTHS_RU_GEN[m.toLowerCase()] || m;
      return `Развертывание полностью завершено ${d} ${monthRu} ${y} года.`;
    });

    // 2. Release announcement patterns
    res = res.replace(/Released the ([A-Za-z]+)\s+(\d{4})\s+(Discover core update|Discover update|core update|spam update|reviews update|product reviews update|helpful content update)/gi, (_, m, y, type) => {
      const monthRu = MONTHS_RU_NOM[m.toLowerCase()] || m;
      const typeLower = type.toLowerCase();
      let typeRu = 'обновление алгоритма';
      if (typeLower.includes('core')) typeRu = 'основное обновление алгоритма (Core Update)';
      else if (typeLower.includes('spam')) typeRu = 'обновление алгоритма борьбы со спамом';
      else if (typeLower.includes('discover')) typeRu = 'обновление рекомендаций Discover';
      else if (typeLower.includes('review')) typeRu = 'обновление отзывов';
      else if (typeLower.includes('helpful')) typeRu = 'обновление полезного контента';
      return `Выпущено ${typeRu} за ${monthRu} ${y} года`;
    });

    // 3. Update titles
    res = res.replace(/\b([A-Za-z]+)\s+(\d{4})\s+(Discover core update|Discover update|core update|spam update|reviews update|product reviews update|helpful content update)\b/gi, (_, m, y, type) => {
      const monthRu = MONTHS_RU_NOM[m.toLowerCase()] || m;
      const typeLower = type.toLowerCase();
      let typeRu = 'Обновление';
      if (typeLower.includes('core')) typeRu = 'Основное обновление алгоритма';
      else if (typeLower.includes('spam')) typeRu = 'Обновление алгоритма борьбы со спамом';
      else if (typeLower.includes('discover')) typeRu = 'Обновление Discover';
      else if (typeLower.includes('review')) typeRu = 'Обновление отзывов';
      else if (typeLower.includes('helpful')) typeRu = 'Обновление полезного контента';
      return `${typeRu} за ${monthRu} ${y} года`;
    });

    // 4. Exact sentences & common status clauses
    const phrases: Array<[RegExp, string]> = [
      [/which applies globally and to all languages/gi, 'применяемое глобально и для всех языков'],
      [/The rollout may take up to two weeks to complete\.?/gi, 'Развертывание может занять до 2 недель.'],
      [/The rollout may take up to 2 weeks to complete\.?/gi, 'Развертывание может занять до 2 недель.'],
      [/The rollout may take up to 3 weeks to complete\.?/gi, 'Развертывание может занять до 3 недель.'],
      [/The rollout may take up to 4 weeks to complete\.?/gi, 'Развертывание может занять до 4 недель.'],
      [/The rollout may take a few days to complete\.?/gi, 'Развертывание может занять несколько дней.'],
      [/The rollout may take several weeks to complete\.?/gi, 'Развертывание может занять несколько недель.'],
      [/The rollout may take up to (\d+) weeks? to complete\.?/gi, 'Развертывание может занять до $1 недель.'],
      [/The rollout is complete\.?/gi, 'Развертывание полностью завершено.'],
      [/Rollout complete\.?/gi, 'Развертывание завершено.'],
      [/Serving was experiencing an issue\.?/gi, 'В системе выдачи результатов (Serving) наблюдался сбой.'],
      [/Serving was experiencing an issue/gi, 'В системе выдачи результатов (Serving) наблюдался сбой'],
      [/Serving is experiencing an ongoing issue\.?/gi, 'Зафиксирован сбой в системе выдачи результатов (Serving).'],
      [/Serving is experiencing an ongoing issue/gi, 'Зафиксирован сбой в системе выдачи результатов (Serving)'],
      [/Serving experienced an issue\.?/gi, 'В системе выдачи результатов (Serving) произошел сбой.'],
      [/Indexing was experiencing an issue\.?/gi, 'Сбой в системе индексации (Indexing).'],
      [/Ranking was experiencing an issue\.?/gi, 'Сбой в алгоритме ранжирования (Ranking).'],
      [/Crawling was experiencing an issue\.?/gi, 'Сбой в системе сканирования (Crawling).'],
      [/We fixed the issue with serving search results\. There will be no more updates\.?/gi, 'Проблема с отображением результатов поиска устранена. Дальнейших сообщений не планируется.'],
      [/We fixed the issue with serving search results\.?/gi, 'Проблема с отображением результатов поиска устранена.'],
      [/The issue with serving has resolved itself\. There will be no more updates\.?/gi, 'Сбой в системе выдачи результатов устранен самостоятельно. Дальнейших сообщений не планируется.'],
      [/The issue with serving has resolved itself\.?/gi, 'Сбой в системе выдачи результатов устранен самостоятельно.'],
      [/We've identified an issue with serving and have been working on a fix\.?/gi, 'Мы выявили проблему в системе выдачи результатов и работаем над ее устранением.'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales\.?/gi, 'Зафиксирован сбой в дата-центре, который может влиять на выдачу страниц в некоторых регионах.'],
      [/We're working on identifying the root cause\.?/gi, 'Мы работаем над установлением первопричины.'],
      [/The next update will be within (\d+) hours\.?/gi, 'Следующее обновление статуса ожидается в течение $1 часов.'],
      [/There will be no more updates\.?/gi, 'Дальнейших сообщений не планируется.'],
      [/for English language users in the US \(will look to expand it to all countries and languages in the future\)/gi, 'для англоязычных пользователей в США (в будущем планируется расширение на другие страны и языки)'],
      [/This update is designed to improve the quality of Discover overall\.?/gi, 'Это обновление направлено на повышение общего качества Discover.'],
      [/Our guidance about general core updates and Discover applies\.?/gi, 'Применяются рекомендации для основных обновлений алгоритма и Discover.'],
      [/Our guidance about general core updates applies\.?/gi, 'Применяются рекомендации для основных обновлений алгоритма.'],
      [/There was an issue with indexing fresh content in Google Search\. Sites may have experienced slower than usual indexing times\.?/gi, 'Возник сбой при индексации свежего контента в Google Search. Сайты могли испытывать задержки при индексации.'],
      [/We fixed the issue with indexing fresh content\. There will be no more updates\.?/gi, 'Проблема с индексацией свежего контента полностью устранена. Дальнейших сообщений не планируется.'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users\.?/gi, 'Зафиксирован сбой в работе сервисов Google Lens, Discover и голосового поиска.'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search\. There will be no more updates\.?/gi, 'Проблема с отображением результатов в Google Lens, Discover и голосовом поиске устранена. Дальнейших сообщений не планируется.']
    ];

    for (const [pattern, rep] of phrases) {
      res = res.replace(pattern, rep);
    }
  }

  // Clean trailing punctuation or double punctuation artifacts
  return res
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/([.:!?,])\s*([.:!?])/g, '$2')
    .trim();
}

/**
 * Strips URLs enclosed in angle brackets (e.g. <https://...>) and cleans up spacing.
 */
export function stripAngleBracketLinks(text: string): string {
  if (!text) return '';
  return text
    // Remove angle bracket URLs like <https://...>, <http://...>, <www...>, <ftp://...>
    .replace(/\s*<https?:\/\/[^>]+>/gi, '')
    .replace(/\s*<www\.[^>]+>/gi, '')
    .replace(/\s*<[a-z0-9+.-]+:\/\/[^>]+>/gi, '')
    // Also remove any remaining <...> that look like links or paths
    .replace(/\s*<[^>\s]+\.[^>\s]+>/gi, '')
    // Clean up multiple consecutive spaces
    .replace(/[ \t]{2,}/g, ' ')
    // Remove space before punctuation marks (e.g. "update ," -> "update,")
    .replace(/ ([,\.!:;?])/g, '$1')
    .trim();
}

function detectIncidentCategory(text: string): IncidentCategory {
  const lower = text.toLowerCase();
  if (lower.includes('discover')) return 'discover';
  if (lower.includes('spam update')) return 'spam';
  if (lower.includes('core update') || lower.includes('helpful content')) return 'core';
  return 'system';
}

function computeDurationHours(begin: Date, end: Date | null): number {
  const endTime = end ? end.getTime() : Date.now();
  const diffMs = Math.max(0, endTime - begin.getTime());
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
}

/**
 * Normalization pipeline mapping raw incident anomalies safely
 */
export function normalizeIncident(raw: any, lang: Language): NormalizedIncident {
  const id = raw.id || `incident-${Math.random()}`;
  
  // Normalized Title/Description from correct Google statuses keys
  const rawTitle = raw.external_desc || raw.external_description || raw.description || raw.summary || 'Google Search Operations Adjustment';
  const cleanTitle = stripAngleBracketLinks(rawTitle);
  const title = cleanTitle;
  const localizedTitle = translateTextAuto(cleanTitle, lang);

  const parsedUpdates: IncidentUpdate[] = [];
  if (raw.updates && Array.isArray(raw.updates) && raw.updates.length > 0) {
    for (const u of raw.updates) {
      const cleaned = stripAngleBracketLinks(u.text || '');
      if (!cleaned) continue;
      parsedUpdates.push({
        when: u.when ? new Date(u.when) : (u.created ? new Date(u.created) : new Date(raw.begin || Date.now())),
        text: stripAngleBracketLinks(translateTextAuto(cleaned, lang)),
        status: u.status
      });
    }
  } else if (raw.most_recent_update && raw.most_recent_update.text) {
    const cleaned = stripAngleBracketLinks(raw.most_recent_update.text);
    if (cleaned) {
      parsedUpdates.push({
        when: raw.most_recent_update.when ? new Date(raw.most_recent_update.when) : new Date(raw.begin || Date.now()),
        text: stripAngleBracketLinks(translateTextAuto(cleaned, lang)),
        status: raw.most_recent_update.status
      });
    }
  }

  parsedUpdates.sort((a, b) => a.when.getTime() - b.when.getTime());

  const localizedUpdateText = parsedUpdates
    .slice()
    .reverse()
    .map(u => u.text)
    .filter(Boolean)
    .join('\n— ');
  
  const desc = localizedUpdateText ? `${localizedTitle}: ${localizedUpdateText}` : localizedTitle;

  // Premium translation dictionary / fallback mapping
  const offlineMatch = OFFLINE_INCIDENTS.find(o => o.id === id);
  let finalDesc = desc;
  if (offlineMatch) {
    finalDesc = offlineMatch.descriptions[lang] || offlineMatch.descriptions['en'];
  }

  // Ensure any angle bracket links are completely stripped
  finalDesc = stripAngleBracketLinks(finalDesc);

  // Parse fields using real Google keys
  let service: ServicesKeys = 'General';
  const rawService = String(raw.service_name || raw.service || raw.source || 'General').toLowerCase();
  
  if (rawService.includes('rank')) service = 'Ranking';
  else if (rawService.includes('index')) service = 'Indexing';
  else if (rawService.includes('serv')) service = 'Serving';
  else if (rawService.includes('crawl')) service = 'Crawling';

  const beginStr = raw.begin || raw.start_time;
  const endStr = raw.end || raw.end_time || raw.resolved;
  const beginDate = beginStr ? new Date(beginStr) : new Date();
  const endDate = endStr ? new Date(endStr) : null;

  const isCoreUpdate = title.toLowerCase().includes('core update') || 
                       title.toLowerCase().includes('spam update') || 
                       title.toLowerCase().includes('helpful content') ||
                       desc.toLowerCase().includes('core update') ||
                       desc.toLowerCase().includes('spam update') ||
                       desc.toLowerCase().includes('helpful content');

  const category = detectIncidentCategory(`${title} ${rawTitle}`);
  const finalTitle = offlineMatch
    ? stripAngleBracketLinks((offlineMatch.descriptions[lang] || offlineMatch.descriptions['en']).split(':')[0])
    : stripAngleBracketLinks(localizedTitle);

  const fallbackUpdates: IncidentUpdate[] =
    parsedUpdates.length > 0
      ? parsedUpdates
      : [{ when: beginDate, text: finalDesc }];

  return {
    id,
    title: finalTitle,
    description: finalDesc,
    service,
    category,
    begin: beginDate,
    end: endDate,
    durationHours: computeDurationHours(beginDate, endDate),
    status: raw.status === 'active' || !endStr ? 'active' : 'resolved',
    isCoreUpdate,
    updates: fallbackUpdates
  };
}

/**
 * Integrates localized descriptors into NormalizedIncidents when fallback occurs
 */
export function getOfflineIncidents(lang: Language): NormalizedIncident[] {
  return OFFLINE_INCIDENTS.map(inc => {
    const beginDate = new Date(inc.begin);
    const endDate = inc.end ? new Date(inc.end) : null;
    const fullDesc = stripAngleBracketLinks(inc.descriptions[lang] || inc.descriptions['en']);
    const titlePart = fullDesc.split(':')[0] || fullDesc;
    const bodyPart = fullDesc.includes(':') ? fullDesc.slice(fullDesc.indexOf(':') + 1).trim() : fullDesc;

    return {
      id: inc.id,
      title: titlePart,
      description: fullDesc,
      service: inc.service,
      category: detectIncidentCategory(inc.descriptions['en']),
      begin: beginDate,
      end: endDate,
      durationHours: computeDurationHours(beginDate, endDate),
      status: inc.end ? 'resolved' : 'active',
      isCoreUpdate: inc.isCoreUpdate,
      updates: [
        {
          when: beginDate,
          text: bodyPart
        }
      ]
    };
  });
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
 * Compiles absolute chronology of points with a 6-day lookback buffer so the
 * 7-day moving average is accurate from day 1 of the requested timeframe.
 */
export function compileTimeline(
  days: number,
  incidents: NormalizedIncident[],
  currentDate: Date = new Date()
): VolatilityPoint[] {
  const lookbackBuffer = 6;
  const totalDays = days + lookbackBuffer;
  const rawPoints: Array<{
    date: Date;
    dateStr: string;
    metricValue: number;
    incidentCount: number;
    incidents: NormalizedIncident[];
  }> = [];
  
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(currentDate);
    d.setUTCDate(currentDate.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);

    const activeIncidents = incidents.filter(inc => {
      const beginDay = new Date(inc.begin);
      beginDay.setUTCHours(0, 0, 0, 0);
      
      const endDay = inc.end ? new Date(inc.end) : null;
      if (endDay) endDay.setUTCHours(23, 59, 59, 999);

      if (endDay) {
        return d >= beginDay && d <= endDay;
      }
      return d >= beginDay;
    });

    const metricValue = calculateNaturalVolatility(d, incidents, activeIncidents, currentDate);

    const dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    rawPoints.push({
      date: d,
      dateStr,
      metricValue,
      incidentCount: activeIncidents.length,
      incidents: activeIncidents
    });
  }

  const withMovingAverages: VolatilityPoint[] = rawPoints.map((pt, idx) => {
    const startIdx = Math.max(0, idx - 6);
    const slice = rawPoints.slice(startIdx, idx + 1);
    const avgNatural = slice.reduce((acc, item) => acc + item.metricValue, 0) / slice.length;

    return {
      ...pt,
      movingAvg7d: Number(avgNatural.toFixed(1))
    };
  });

  return withMovingAverages.slice(lookbackBuffer);
}

/**
 * Computes historical statistics and a 12-month incident frequency distribution.
 */
export function computeHistoricalInsights(
  incidents: NormalizedIncident[],
  referenceDate: Date = new Date()
): HistoricalInsights {
  const algoUpdates = incidents
    .filter(inc => inc.isCoreUpdate)
    .slice()
    .sort((a, b) => b.begin.getTime() - a.begin.getTime());

  const coreCompleted = algoUpdates.filter(
    inc => (inc.category === 'core' || inc.category === 'discover') && inc.end !== null
  );
  const spamCompleted = algoUpdates.filter(
    inc => inc.category === 'spam' && inc.end !== null
  );

  const avgCoreDurationDays =
    coreCompleted.length > 0
      ? Number(
          (
            coreCompleted.reduce((sum, inc) => sum + inc.durationHours / 24, 0) /
            coreCompleted.length
          ).toFixed(1)
        )
      : null;

  const avgSpamDurationDays =
    spamCompleted.length > 0
      ? Number(
          (
            spamCompleted.reduce((sum, inc) => sum + inc.durationHours / 24, 0) /
            spamCompleted.length
          ).toFixed(1)
        )
      : null;

  let avgDaysBetweenUpdates: number | null = null;
  if (algoUpdates.length >= 2) {
    let gapSum = 0;
    for (let i = 0; i < algoUpdates.length - 1; i++) {
      const diffDays = Math.abs(
        (algoUpdates[i].begin.getTime() - algoUpdates[i + 1].begin.getTime()) / (1000 * 60 * 60 * 24)
      );
      gapSum += diffDays;
    }
    avgDaysBetweenUpdates = Math.round(gapSum / (algoUpdates.length - 1));
  }

  const latestUpdate = algoUpdates[0] || null;
  const daysSinceLastUpdate = latestUpdate
    ? Math.max(
        0,
        Math.floor((referenceDate.getTime() - latestUpdate.begin.getTime()) / (1000 * 60 * 60 * 24))
      )
    : null;

  const monthlyDistribution: MonthlyIncidentBucket[] = [];
  const bucketMap = new Map<string, MonthlyIncidentBucket>();

  for (let offset = 11; offset >= 0; offset--) {
    const d = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth() - offset, 1));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const bucket: MonthlyIncidentBucket = {
      monthKey: key,
      date: d,
      coreCount: 0,
      spamCount: 0,
      systemCount: 0,
      total: 0
    };
    monthlyDistribution.push(bucket);
    bucketMap.set(key, bucket);
  }

  for (const inc of incidents) {
    const key = `${inc.begin.getUTCFullYear()}-${String(inc.begin.getUTCMonth() + 1).padStart(2, '0')}`;
    const bucket = bucketMap.get(key);
    if (!bucket) continue;

    if (inc.category === 'spam') bucket.spamCount += 1;
    else if (inc.isCoreUpdate) bucket.coreCount += 1;
    else bucket.systemCount += 1;
    bucket.total += 1;
  }

  return {
    avgCoreDurationDays,
    avgSpamDurationDays,
    avgDaysBetweenUpdates,
    daysSinceLastUpdate,
    latestAlgoUpdateTitle: latestUpdate ? latestUpdate.title : null,
    totalCoreUpdates: algoUpdates.filter(i => i.category !== 'spam').length,
    totalSpamUpdates: algoUpdates.filter(i => i.category === 'spam').length,
    totalSystemIncidents: incidents.filter(i => !i.isCoreUpdate).length,
    monthlyDistribution
  };
}
