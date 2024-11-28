import React from 'react';
import { X } from 'lucide-react';
import { useAnimeStore } from '../store/useAnimeStore';

export function FilterTags() {
  const { preferences, updatePreferences } = useAnimeStore();

  const removeGenre = (genre: string) => {
    updatePreferences({
      favoriteGenres: preferences.favoriteGenres.filter((g) => g !== genre),
    });
  };

  if (preferences.favoriteGenres.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {preferences.favoriteGenres.map((genre) => (
        <span
          key={genre}
          className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800"
        >
          {genre}
          <button
            onClick={() => removeGenre(genre)}
            className="ml-2 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}
    </div>
  );
}