import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Anime } from '../types/anime';
import { fetchUserAnimeList } from '../services/api';

interface WatchlistStore {
  watchlist: Anime[];
  malUsername: string | null;
  setMALUsername: (username: string) => void;
  addToWatchlist: (anime: Anime) => void;
  removeFromWatchlist: (id: number) => void;
  importFromMAL: () => Promise<void>;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      malUsername: null,
      setMALUsername: (username) => set({ malUsername: username }),
      addToWatchlist: (anime) =>
        set((state) => {
          if (state.watchlist.some((a) => a.id === anime.id)) return state;
          return { watchlist: [...state.watchlist, anime] };
        }),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((a) => a.id !== id),
        })),
      importFromMAL: async () => {
        const username = get().malUsername;
        if (!username) return;
        const list = await fetchUserAnimeList(username);
        set({ watchlist: list });
      },
    }),
    {
      name: 'watchlist-storage',
    }
  )
);

