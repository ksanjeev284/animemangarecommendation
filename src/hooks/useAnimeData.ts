import { useQuery } from 'react-query';
import { fetchTopAnime } from '../services/api';
import { useAnimeStore } from '../store/useAnimeStore';

export function useAnimeData() {
  const { setAnimeList, setError } = useAnimeStore();

  return useQuery('topAnime', fetchTopAnime, {
    onSuccess: (data) => {
      setAnimeList(data);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}