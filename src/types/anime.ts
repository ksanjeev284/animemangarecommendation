export interface Anime {
  id: number;
  slug: string;
  title: string;
  genre: string[];
  rating: number;
  imageUrl: string;
  description: string;
  year: number;
}

export type UserPreferences = {
  favoriteGenres: string[];
  minimumRating: number;
  yearRange: {
    start: number;
    end: number;
  };
};