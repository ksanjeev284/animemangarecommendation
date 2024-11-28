import axios from 'axios';
import { Anime } from '../types/anime';
import { Manga } from '../types/manga';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

// Helper function to convert Jikan API response to our Anime type
const convertToAnime = (anime: any): Anime => ({
  id: anime.mal_id,
  title: anime.title,
  genre: anime.genres?.map((g: any) => g.name) || [],
  rating: anime.score || 0,
  imageUrl: anime.images.jpg.image_url,
  description: anime.synopsis,
  year: anime.aired?.from ? new Date(anime.aired.from).getFullYear() : new Date().getFullYear()
});

// Helper function to convert Jikan API response to our Manga type
const convertToManga = (manga: any): Manga => ({
  id: manga.mal_id,
  title: manga.title,
  genre: manga.genres?.map((g: any) => g.name) || [],
  rating: manga.score || 0,
  imageUrl: manga.images.jpg.image_url,
  description: manga.synopsis,
  year: manga.published?.from ? new Date(manga.published.from).getFullYear() : new Date().getFullYear(),
  status: manga.status || 'Unknown',
  chapters: manga.chapters,
  volumes: manga.volumes
});

// Add delay between API calls to respect rate limits
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Anime API calls
export async function fetchTopAnime(): Promise<Anime[]> {
  try {
    const [topResponse, airingResponse] = await Promise.all([
      axios.get(`${JIKAN_API_BASE}/top/anime`, {
        params: {
          limit: 25,
          filter: 'bypopularity'
        }
      }),
      axios.get(`${JIKAN_API_BASE}/seasons/now`, {
        params: {
          limit: 25
        }
      })
    ]);

    await delay(1000); // Respect API rate limit

    const popularAnime = topResponse.data.data.map(convertToAnime);
    const airingAnime = airingResponse.data.data.map(convertToAnime);

    // Combine and remove duplicates
    const combinedAnime = [...popularAnime, ...airingAnime];
    const uniqueAnime = Array.from(new Map(combinedAnime.map(item => [item.id, item])).values());

    return uniqueAnime;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function searchAnime(query: string): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/anime`, {
      params: {
        q: query,
        limit: 25,
        order_by: 'popularity',
        sort: 'desc',
        sfw: true
      }
    });

    return response.data.data.map(convertToAnime);
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}

export async function fetchSeasonalAnime(
  season: 'winter' | 'spring' | 'summer' | 'fall' = getCurrentSeason(),
  year: number = new Date().getFullYear()
): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/seasons/${year}/${season}`);
    return response.data.data.map(convertToAnime);
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    return [];
  }
}

// Manga API calls
export async function fetchTopManga(): Promise<Manga[]> {
  try {
    const [topResponse, publishingResponse] = await Promise.all([
      axios.get(`${JIKAN_API_BASE}/top/manga`, {
        params: {
          limit: 25,
          filter: 'bypopularity'
        }
      }),
      axios.get(`${JIKAN_API_BASE}/manga`, {
        params: {
          status: 'publishing',
          order_by: 'popularity',
          sort: 'desc',
          limit: 25
        }
      })
    ]);

    await delay(1000); // Respect API rate limit

    const popularManga = topResponse.data.data.map(convertToManga);
    const publishingManga = publishingResponse.data.data.map(convertToManga);

    // Combine and remove duplicates
    const combinedManga = [...popularManga, ...publishingManga];
    const uniqueManga = Array.from(new Map(combinedManga.map(item => [item.id, item])).values());

    return uniqueManga;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return [];
  }
}

export async function searchManga(query: string): Promise<Manga[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/manga`, {
      params: {
        q: query,
        limit: 25,
        order_by: 'popularity',
        sort: 'desc',
        sfw: true
      }
    });

    return response.data.data.map(convertToManga);
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
}

// Helper function to get current season
function getCurrentSeason(): 'winter' | 'spring' | 'summer' | 'fall' {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
}