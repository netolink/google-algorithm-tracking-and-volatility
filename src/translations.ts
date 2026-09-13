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
        range: '0% - 30%',
        desc: 'Normal baseline fluctuations. No active core or spam algorithm updates monitored.'
      },
      volatile: {
        title: 'Unstable (31% - 60%)',
        range: '31% - 60%',
        desc: 'Minor update rollouts or system indexing anomalies. Monitor search rankings closely.'
      },
      storm: {
        title: 'Algo Storm (61%+)',
        range: '61% - 100%',
        desc: 'Official Core or Spam update active, or major system outage. High ranking flux globally.'
      }
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
        range: '0% - 30%',
        desc: 'תנודות שגרתיות וטבעיות בתוצאות החיפוש. לא זוהו עדכוני ליבה או ספאם פעילים ברקע.'
      },
      volatile: {
        title: 'תנודתי (31% - 60%)',
        range: '31% - 60%',
        desc: 'שלבי בדיקה של עדכונים קטנים או אנומליות באינדוקס. מומלץ לעקוב מקרוב אחר דירוגי האתר.'
      },
      storm: {
        title: 'סערת אלגוריתם (61%+)',
        range: '61% - 100%',
        desc: 'עדכון ליבה או ספאם רשמי פעיל, או תקלת מערכת רחבה. תנודתיות חריגה ומשמעותית בדירוגים בעולם.'
      }
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
      dataSource: 'מבוסס על נתוני Google Search Status API הרשמיים'
    }
  },
  ru: {
    title: 'Мониторинг алгоритмов и волатильности Google',
    subtitle: 'Аналитика волатильности поисковой выдачи (SERP) в реальном времени, сопоставленная с официальными сбоями и обновлениями Google.',
    langLabel: 'Язык',
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
        range: '0% - 30%',
        desc: 'Естественные базовые колебания. Активных обновлений основного алгоритма (Core) или спам-фильтров не обнаружено.'
      },
      volatile: {
        title: 'Нестабильно (31% - 60%)',
        range: '31% - 60%',
        desc: 'Предварительные раскатки небольших обновлений или аномалии индексации. Рекомендуется внимательно следить за позициями.'
      },
      storm: {
        title: 'Шторм алгоритма (61%+)',
        range: '61% - 100%',
        desc: 'Активно официальное обновление основного алгоритма (Core) или спам-фильтров, либо крупный сбой Google. Высокая турбулентность выдачи.'
      }
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
      dataSource: 'На основе официальных данных Google Search Status API'
    }
  }
};
