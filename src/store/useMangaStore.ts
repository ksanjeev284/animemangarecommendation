import { create } from 'zustand';
import { Manga } from '../types/manga';

interface MangaStore {
  mangaList: Manga[];
  filteredManga: Manga[];
  preferences: {
    favoriteGenres: string[];
    minimumRating: number;
    yearRange: {
      start: number;
      end: number;
    };
  };
  setMangaList: (manga: Manga[]) => void;
  setFilteredManga: (manga: Manga[]) => void;
  updatePreferences: (preferences: Partial<MangaStore['preferences']>) => void;
}

export const useMangaStore = create<MangaStore>((set) => ({
  mangaList: [],
  filteredManga: [],
  preferences: {
    favoriteGenres: [],
    minimumRating: 0,
    yearRange: {
      start: 1990,
      end: new Date().getFullYear(),
    },
  },
  setMangaList: (manga) => set({ mangaList: manga, filteredManga: manga }),
  setFilteredManga: (manga) => set({ filteredManga: manga }),
  updatePreferences: (newPreferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    })),
}));
