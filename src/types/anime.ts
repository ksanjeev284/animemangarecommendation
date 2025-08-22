export interface AnimeCharacter {
  name: string;
  role: string;
  voiceActorName: string;
  imageUrl: string;
}

export interface Anime {
  id: number;
  slug: string;
  title: string;
  genre: string[];
  rating: number;
  imageUrl: string;
  description: string;
  year: number;
  trailerUrl?: string;
  characters: AnimeCharacter[];
}

export type UserPreferences = {
  favoriteGenres: string[];
  minimumRating: number;
  yearRange: {
    start: number;
    end: number;
  };
};
