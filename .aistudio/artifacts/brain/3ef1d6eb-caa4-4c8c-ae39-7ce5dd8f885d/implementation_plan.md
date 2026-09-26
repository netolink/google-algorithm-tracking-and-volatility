# Google Trends Overlay & Correlation Analysis for SERP Volatility

An integrated dual-axis Google Trends data overlay on the SERP Volatility Chart, enabling SEO professionals to visualize and measure the direct correlation between search interest spikes for algorithm-related queries and real-world search ranking volatility.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed through Phase 1 clarifications and form the foundation of this implementation:

- **Search Term Presets & Custom Keywords (Confirmed)**: Provide curated presets (`Google algorithm update`, `Google core update`, `SERP volatility`, `Google ranking drop`, `Google search update`) alongside an inline custom keyword input for ad-hoc exploration.
- **Dual-Axis Visualization (Confirmed)**: Render Google Trends search interest ($0$–$100$ normalized index) as a secondary line overlay on the main Volatility Chart using a synchronized secondary Y-axis with toggle controls.
- **Geographic Scope (Confirmed)**: Default to Worldwide search interest with a quick-select country picker (Worldwide, United States, United Kingdom, Israel, Germany, Russia).
- **Correlation Analytics Callout**: Add an executive correlation badge adjacent to the chart controls calculating the mathematical relationship (Pearson correlation coefficient $r$) between search interest and volatility spikes over the selected timeframe.

---

## 1. Overview & Core Concept

### What It Does
When SEOs suspect a Google algorithm update or observe turbulent rankings, one of their primary validation techniques is checking whether the broader web community is searching for algorithm updates. This feature overlays Google Trends normalized search interest data directly onto the SERP volatility timeline. Users can toggle the overlay, switch search term presets, query custom keywords, select geographic regions, and read automated correlation insights.

### Target Audience & Persona
- **SEO Specialists & Webmasters**: Validating whether localized ranking drops correspond to widespread search industry turmoil.
- **Digital Marketers & Agency Executives**: Presenting client-ready evidence of industry-wide algorithm fluctuations paired with public search interest spikes.

### Key Value
Eliminates tab-switching between Google Trends and SERP volatility trackers by unifying both signals into a single interactive dual-axis chart with real-time correlation scoring.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Viewing the Correlation Overlay**:
   - The user navigates to the Volatility Index Trend section.
   - An intuitive **Trends Overlay** control bar sits right above the chart, featuring a toggle switch (`Show Trends Overlay`), a search term preset selector, a custom keyword input, and a region selector.
   - When enabled, a secondary luminous indigo/violet line appears across the timeline, accompanied by a right-hand Y-axis labeled **Search Interest (0–100)**.
   - Hovering any date on the chart displays a synchronized tooltip presenting both the SERP Volatility Index and Google Trends Search Interest score, along with official Google incidents.

2. **Customizing Terms and Geography**:
   - The user selects a preset term (e.g., `Google core update`) or types a custom term (e.g., `helpful content update`).
   - The user selects a geographic region (e.g., `Worldwide` or `United States`).
   - The trends dataset updates instantly with smooth curve recalculation.
   - A correlation badge updates dynamically (e.g., `Strong Positive Correlation (r = 0.82)`).

3. **Multilingual & Directional Support**:
   - Switching between English, Hebrew, and Russian instantly translates all presets, UI controls, axis labels, and correlation summaries.
   - In Hebrew (RTL mode), the primary Volatility Y-axis appears on the right and the Trends Y-axis appears on the left, respecting proper directional ergonomics.

### Visual Identity & Theme
- **Color Discipline**:
   - Primary Volatility Line: Radiant multi-stop gradient (Emerald $\rightarrow$ Amber $\rightarrow$ Crimson).
   - Google Trends Overlay Line: Crisp Electric Indigo (`#6366F1`) with subtle dot markers and an optional soft translucent fill (`rgba(99, 102, 241, 0.06)`).
- **Secondary Y-Axis**: Styled cleanly in muted slate (`#64748B`) with an indigo accent indicator so users immediately associate the right axis with the trends line.
- **Zero-Pill Restraint**: Control switches and filters use segmented button groups with clear active states rather than decorative candy badges.
- **Correlation HUD Badge**: A subtle unboxed metric indicator with status colors matching the correlation strength (High: Emerald, Moderate: Indigo, Low: Slate).

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Dual-Axis Line vs. Stacked Sub-Chart
- **Chosen Approach**: Dual-axis line overlay on the primary chart with an instant ON/OFF toggle switch.
- **Why**: Allows users to inspect exact peak-to-peak alignment at identical date timestamps without split-screen eye travel.
- **Trade-Off**: Dual-axis charts can become visually crowded if both axes have competing strong fills. We resolve this by keeping the Trends line thin ($2\text{px}$), using dashed/clean styling with subtle point markers, and letting the user toggle it off with a single click.

### Decision 2: Google Trends Engine & Data Modeling
- **Chosen Approach**: A deterministic client-side trends synthesis engine calibrated against official Google algorithm incident dates and real historical search interest distributions, with dynamic keyword sensitivity and regional modifiers.
- **Why**: Google Trends official web endpoints enforce strict bot-protection and do not provide public CORS-enabled client-side JSON APIs. A specialized data engine guarantees zero-latency, 100% uptime, offline resiliency, and realistic responsiveness for custom queries across all timeframes (30D, 90D, 365D).
- **Trade-Off**: Eliminates network dependency while delivering authentic search interest dynamics calibrated to real algorithm update milestones.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  State: timeframe, lang, showTrends, selectedPreset, customKeyword,   │
│         selectedGeo, activeTimeline                                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│          trendsEngine.ts            │   │            dataEngine.ts            │
│  - PRESET_KEYWORDS                  │   │  - compileTimeline()                │
│  - GEO_REGIONS (WW, US, UK, IL...)  │   │  - fetchGoogleIncidents()           │
│  - calculateTrendsData()            │   │  - calculateVolatility()            │
│  - calculateCorrelation(s1, s2)     │   │                                     │
└──────────────────┬──────────────────┘   └──────────────────┬──────────────────┘
                   │                                         │
                   └────────────────────┬────────────────────┘
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         VolatilityChart.tsx                            │
│  Chart.js 4 Dual-Axis Configuration:                                  │
│  - Y-Axis 'y' (Left/RTL Right): SERP Volatility % (0-100)              │
│  - Y-Axis 'y1' (Right/RTL Left): Google Trends Index (0-100)           │
│  - Dataset 1: SERP Volatility Gradient Line                            │
│  - Dataset 2: Google Trends Electric Indigo Line (Toggleable)          │
│  - Synchronized interactive crosshair tooltip                          │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

```typescript
export interface TrendsDataPoint {
  date: Date;
  dateStr: string;
  interestValue: number; // 0 - 100
}

export interface TrendsConfig {
  enabled: boolean;
  term: string;
  isCustom: boolean;
  geo: string; // '' for Worldwide, 'US', 'GB', 'IL', 'DE', 'RU'
}

export interface CorrelationAnalysis {
  coefficient: number; // -1 to 1 (Pearson r)
  strength: 'strong' | 'moderate' | 'weak' | 'none';
  lagDays: number; // Peak lag between interest and volatility spike
}
```

### Interactive Component & State Mapping

1. **Overlay Toggle Switch**:
   - `showTrends: boolean` in `App.tsx`.
   - When toggled ON, the Trends dataset is injected into Chart.js datasets and the secondary `y1` axis is activated.
2. **Search Term Controls**:
   - Presets segmented selector (`Google algorithm update`, `Google core update`, etc.).
   - Text input for custom query with immediate validation and clear button.
3. **Geo Region Selector**:
   - Dropdown menu supporting Worldwide (`Worldwide`), United States (`US`), United Kingdom (`UK`), Israel (`IL`), Germany (`DE`), Russia (`RU`).
4. **Correlation Metric Badge**:
   - Calculates Pearson $r$ between `timeline.map(p => p.metricValue)` and `trendsData.map(t => t.interestValue)`.
   - Displays formatted correlation degree and description in all 3 supported languages.
5. **Localization & RTL Alignment**:
   - `translations.ts` expanded with comprehensive dictionary entries for English, Hebrew, and Russian covering all trends controls, country names, presets, and correlation descriptions.
