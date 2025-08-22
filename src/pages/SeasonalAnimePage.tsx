import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchUpcomingAnime } from '../services/api';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/AnimeCard';

const SeasonalAnimePage: React.FC = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUpcomingAnime();
        setAnime(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Seasonal Anime</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {anime.map(a => (
          <AnimeCard key={a.id} anime={a} />
        ))}
      </div>
    </div>
  );
};

export default SeasonalAnimePage;
