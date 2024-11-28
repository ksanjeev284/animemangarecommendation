export interface Anime {
  id: number;
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