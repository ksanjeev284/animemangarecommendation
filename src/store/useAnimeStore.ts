import { create } from 'zustand';
import { UserPreferences, Anime } from '../types/anime';

interface AnimeStore {
  preferences: UserPreferences;
  animeList: Anime[];
  isLoading: boolean;
  error: string | null;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setAnimeList: (animeList: Anime[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAnimeStore = create<AnimeStore>((set) => ({
  preferences: {
    favoriteGenres: [],
    minimumRating: 7,
    yearRange: {
      start: 2000,
      end: 2024,
    },
  },
  animeList: [],
  isLoading: false,
  error: null,
  updatePreferences: (newPreferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    })),
  setAnimeList: (animeList) => set({ animeList }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));