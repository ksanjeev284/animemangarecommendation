import axios from 'axios';
import { Anime, AnimeCharacter } from '../types/anime';
import { Manga } from '../types/manga';
import { Review } from '../types/review';
import { slugify } from '../utils/slugify';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

interface RawGenre { name: string }

interface RawAnime {
  mal_id: number;
  title: string;
  genres?: RawGenre[];
  score?: number;
  images: { jpg: { image_url: string } };
  synopsis: string;
  aired?: { from?: string };
}

// Helper function to convert Jikan API response to our Anime type
const convertToAnime = (anime: RawAnime): Anime => ({
  id: anime.mal_id,
  slug: slugify(anime.title),
  title: anime.title,
  genre: anime.genres?.map((g: RawGenre) => g.name) || [],
  rating: anime.score || 0,
  imageUrl: anime.images.jpg.image_url,
  description: anime.synopsis,
  year: anime.aired?.from ? new Date(anime.aired.from).getFullYear() : new Date().getFullYear(),
  characters: []
});

interface RawManga {
  mal_id: number;
  title: string;
  genres?: RawGenre[];
  score?: number;
  images: { jpg: { image_url: string } };
  synopsis: string;
  published?: { from?: string };
  status?: string;
  chapters?: number;
  volumes?: number;
}

// Helper function to convert Jikan API response to our Manga type
const convertToManga = (manga: RawManga): Manga => ({
  id: manga.mal_id,
  slug: slugify(manga.title),
  title: manga.title,
  genre: manga.genres?.map((g: RawGenre) => g.name) || [],
  rating: manga.score || 0,
  imageUrl: manga.images.jpg.image_url,
  description: manga.synopsis,
  year: manga.published?.from ? new Date(manga.published.from).getFullYear() : new Date().getFullYear(),
  status: manga.status || 'Unknown',
  chapters: manga.chapters,
  volumes: manga.volumes
});

interface RawReview {
  user: { username: string };
  score: number;
  review: string;
}

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

export async function fetchUpcomingAnime(): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/seasons/upcoming`);
    return response.data.data.map(convertToAnime);
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    return [];
  }
}

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export async function fetchSchedule(day?: Weekday): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/schedules`, {
      params: day ? { filter: day } : undefined
    });
    return response.data.data.map(convertToAnime);
  } catch (error) {
    console.error('Error fetching anime schedule:', error);
    return [];
  }
}

export async function fetchAnimeById(id: number): Promise<Anime | null> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${id}`);
    return convertToAnime(response.data.data);
  } catch (error) {
    console.error('Error fetching anime by ID:', error);
    return null;
  }
}


export async function fetchAnimeBySlug(slug: string): Promise<Anime | null> {
  try {
    const query = slug.replace(/-/g, ' ');
    const searchResponse = await axios.get(`${JIKAN_API_BASE}/anime`, {
      params: { q: query, limit: 1 }
    });
    const result = searchResponse.data.data[0];
    if (!result) return null;
    return await fetchAnimeById(result.mal_id);
  } catch (error) {
    console.error('Error fetching anime by slug:', error);
    return null;
  }
}

export async function fetchAnimeReviews(id: number): Promise<Review[]> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${id}/reviews`, {
      params: { limit: 5 }
    });
    return response.data.data.map((review: RawReview) => ({
      author: review.user?.username,
      score: review.score,
      text: review.review
    }));
  } catch (error) {
    console.error('Error fetching anime reviews:', error);
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

export async function fetchMangaById(id: number): Promise<Manga | null> {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/manga/${id}`);
    return convertToManga(response.data.data);
  } catch (error) {
    console.error('Error fetching manga by ID:', error);
    return null;
  }
}

export async function fetchUserAnimeList(username: string): Promise<Anime[]> {
  try {
    const response = await axios.get(
      `${JIKAN_API_BASE}/users/${username}/animelist`,
      {
        params: { limit: 1000 },
      }
    );
    interface UserAnimeEntry {
      anime: RawAnime;
    }
    return response.data.data.map((entry: UserAnimeEntry) => convertToAnime(entry.anime));
  } catch (error) {
    console.error('Error fetching user animelist:', error);
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
