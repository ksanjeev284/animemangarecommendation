import React from 'react';
import { Loader2 } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import { useAnimeStore } from '../store/useAnimeStore';
import { getRecommendations } from '../utils/recommendationEngine';

export function AnimeList() {
  const { preferences, animeList, isLoading, error } = useAnimeStore();
  const recommendations = getRecommendations(animeList, preferences);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No recommendations found based on your preferences.
          Try adjusting your filters!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommendations.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}