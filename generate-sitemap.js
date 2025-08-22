const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_BASE = 'https://www.animetrend.in/api'; // Change if your API base is different
const SITE_URL = 'https://www.animetrend.in';
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

async function fetchAll(endpoint) {
  let results = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`${API_BASE}/${endpoint}?page=${page}`);
    if (!res.ok) break;
    const data = await res.json();
    if (!data || !data.results || data.results.length === 0) break;
    results = results.concat(data.results);
    page++;
    hasMore = data.next !== null && data.next !== undefined;
  }
  return results;
}

(async () => {
  try {
    const [animeList, mangaList] = await Promise.all([
      fetchAll('anime'),
      fetchAll('manga'),
    ]);

    const urls = [
      `${SITE_URL}/`,
      `${SITE_URL}/recommendations`,
      `${SITE_URL}/trending`,
      `${SITE_URL}/discover`,
      `${SITE_URL}/about`,
      `${SITE_URL}/seasonal`,
      ...animeList.map(a => `${SITE_URL}/anime/${a.id || a.slug}`),
      ...mangaList.map(m => `${SITE_URL}/manga/${m.id || m.slug}`),
    ];

    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map(
        url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
    console.log('Sitemap generated with', urls.length, 'URLs.');
  } catch (err) {
    console.error('Failed to generate sitemap:', err);
    process.exit(1);
  }
})(); 