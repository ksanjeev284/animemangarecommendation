import { Anime, UserPreferences } from '../types/anime';

// Weights for different factors in recommendation scoring
const WEIGHTS = {
  RATING: 0.4,
  GENRE_MATCH: 0.3,
  RECENCY: 0.2,
  GENRE_COUNT: 0.1,
};

// Calculate how well genres match user preferences
function calculateGenreScore(animeGenres: string[], preferredGenres: string[]): number {
  if (preferredGenres.length === 0) return 1; // If no preferences, don't penalize
  
  const matchingGenres = animeGenres.filter(genre => 
    preferredGenres.includes(genre)
  );
  
  // Calculate both the quantity and percentage of matching genres
  const matchPercentage = matchingGenres.length / preferredGenres.length;
  const genreCountScore = matchingGenres.length / Math.max(animeGenres.length, 1);
  
  return (matchPercentage * 0.7) + (genreCountScore * 0.3);
}

// Calculate recency score based on release year
function calculateRecencyScore(animeYear: number, currentYear: number): number {
  const age = currentYear - animeYear;
  // Exponential decay formula: score decreases as anime gets older
  return Math.exp(-0.1 * age);
}

// Normalize rating to 0-1 scale
function normalizeRating(rating: number): number {
  return rating / 10;
}

// Calculate overall recommendation score
function calculateScore(
  anime: Anime,
  preferences: UserPreferences,
  currentYear: number
): number {
  // Basic filtering
  if (anime.rating < preferences.minimumRating) return -1;
  if (
    anime.year < preferences.yearRange.start ||
    anime.year > preferences.yearRange.end
  ) {
    return -1;
  }

  // Calculate individual scores
  const ratingScore = normalizeRating(anime.rating);
  const genreScore = calculateGenreScore(anime.genre, preferences.favoriteGenres);
  const recencyScore = calculateRecencyScore(anime.year, currentYear);
  const genreCountScore = Math.min(anime.genre.length / 5, 1); // Normalize genre count, cap at 5

  // Calculate weighted sum
  const totalScore = 
    (ratingScore * WEIGHTS.RATING) +
    (genreScore * WEIGHTS.GENRE_MATCH) +
    (recencyScore * WEIGHTS.RECENCY) +
    (genreCountScore * WEIGHTS.GENRE_COUNT);

  return totalScore;
}

export function getRecommendations(
  animeList: Anime[],
  preferences: UserPreferences
): Anime[] {
  const currentYear = new Date().getFullYear();

  // Calculate scores for all anime
  const scoredAnime = animeList
    .map(anime => ({
      anime,
      score: calculateScore(anime, preferences, currentYear)
    }))
    .filter(item => item.score >= 0) // Remove filtered out anime
    .sort((a, b) => b.score - a.score); // Sort by score descending

  // Return only the anime objects, without scores
  return scoredAnime.map(item => item.anime);
}