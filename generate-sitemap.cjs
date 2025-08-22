const fs = require('fs');
const path = require('path');

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';
const SITE_URL = 'https://www.animetrend.in';
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

async function fetchTopAnime() {
  try {
    const [topResponse, airingResponse] = await Promise.all([
      fetch(`${JIKAN_API_BASE}/top/anime?limit=25&filter=bypopularity`),
      fetch(`${JIKAN_API_BASE}/seasons/now?limit=25`)
    ]);
    const topData = await topResponse.json();
    const airingData = await airingResponse.json();
    const popularAnime = topData.data || [];
    const airingAnime = airingData.data || [];
    // Combine and remove duplicates by mal_id
    const combined = [...popularAnime, ...airingAnime];
    const unique = Array.from(new Map(combined.map(item => [item.mal_id, item])).values());
    return unique;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

async function fetchTopManga() {
  try {
    const [topResponse, publishingResponse] = await Promise.all([
      fetch(`${JIKAN_API_BASE}/top/manga?limit=25&filter=bypopularity`),
      fetch(`${JIKAN_API_BASE}/manga?status=publishing&order_by=popularity&sort=desc&limit=25`)
    ]);
    const topData = await topResponse.json();
    const publishingData = await publishingResponse.json();
    const popularManga = topData.data || [];
    const publishingManga = publishingData.data || [];
    // Combine and remove duplicates by mal_id
    const combined = [...popularManga, ...publishingManga];
    const unique = Array.from(new Map(combined.map(item => [item.mal_id, item])).values());
    return unique;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return [];
  }
}

(async () => {
  try {
    const [animeList, mangaList] = await Promise.all([
      fetchTopAnime(),
      fetchTopManga(),
    ]);

    const urls = [
      `${SITE_URL}/`,
      `${SITE_URL}/recommendations`,
      `${SITE_URL}/trending`,
      `${SITE_URL}/discover`,
      `${SITE_URL}/about`,
      `${SITE_URL}/seasonal`,
      ...animeList.map(a => `${SITE_URL}/anime/${a.mal_id}`),
      ...mangaList.map(m => `${SITE_URL}/manga/${m.mal_id}`),
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