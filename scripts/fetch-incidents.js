import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GOOGLE_API_URL = 'https://status.search.google.com/incidents.json';
const publicDir = path.join(rootDir, 'public');
const srcDataDir = path.join(rootDir, 'src', 'data');
const publicFile = path.join(publicDir, 'incidents.json');
const srcDataFile = path.join(srcDataDir, 'incidents.json');

async function fetchAndSaveIncidents() {
  console.log(`[Google Sync] Fetching official Google Search Status Dashboard API: ${GOOGLE_API_URL}`);
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(srcDataDir)) {
    fs.mkdirSync(srcDataDir, { recursive: true });
  }

  try {
    const response = await fetch(GOOGLE_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GoogleAlgorithmTracker/1.0; +https://netolink.com)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Google API returned status code: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Google API did not return an array of incidents.');
    }

    function cleanText(text) {
      if (!text) return '';
      return text
        .replace(/\s*<https?:\/\/[^>]+>/gi, '')
        .replace(/\s*<www\.[^>]+>/gi, '')
        .replace(/\s*<[a-z0-9+.-]+:\/\/[^>]+>/gi, '')
        .replace(/\s*<[^>\s]+\.[^>\s]+>/gi, '')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/ ([,\.!:;?])/g, '$1')
        .trim();
    }

    const cleanedData = data.map(item => {
      const copy = { ...item };
      if (copy.external_desc) copy.external_desc = cleanText(copy.external_desc);
      if (copy.external_description) copy.external_description = cleanText(copy.external_description);
      if (copy.description) copy.description = cleanText(copy.description);
      if (copy.summary) copy.summary = cleanText(copy.summary);
      if (Array.isArray(copy.updates)) {
        copy.updates = copy.updates.map(u => ({
          ...u,
          text: cleanText(u.text)
        }));
      }
      if (copy.most_recent_update && copy.most_recent_update.text) {
        copy.most_recent_update = {
          ...copy.most_recent_update,
          text: cleanText(copy.most_recent_update.text)
        };
      }
      return copy;
    });

    const jsonString = JSON.stringify(cleanedData, null, 2);

    fs.writeFileSync(publicFile, jsonString, 'utf-8');
    fs.writeFileSync(srcDataFile, jsonString, 'utf-8');

    console.log(`[Google Sync] Successfully saved ${data.length} official incidents directly to:`);
    console.log(`  -> ${publicFile}`);
    console.log(`  -> ${srcDataFile}`);
  } catch (error) {
    console.warn('[Google Sync] Warning: Could not fetch live Google API during build:', error.message);
    if (fs.existsSync(publicFile)) {
      console.log('[Google Sync] Retaining existing public/incidents.json cache.');
    } else {
      console.warn('[Google Sync] No existing incidents.json found. Creating empty fallback array.');
      fs.writeFileSync(publicFile, '[]', 'utf-8');
      fs.writeFileSync(srcDataFile, '[]', 'utf-8');
    }
  }
}

fetchAndSaveIncidents();
