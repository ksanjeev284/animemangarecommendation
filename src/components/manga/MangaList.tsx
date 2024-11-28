import React from 'react';
import { useMangaStore } from '../../store/useMangaStore';
import { MangaCard } from './MangaCard';

export function MangaList() {
  const { filteredManga } = useMangaStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {filteredManga.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
}
