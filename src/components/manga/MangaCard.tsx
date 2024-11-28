import React from 'react';
import { Star, BookOpen, BookText } from 'lucide-react';
import { Manga } from '../../types/manga';

interface MangaCardProps {
  manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={manga.imageUrl}
          alt={manga.title}
          className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {manga.title}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-gray-600">{manga.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {manga.genre.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          {manga.chapters && (
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {manga.chapters} chapters
            </div>
          )}
          {manga.volumes && (
            <div className="flex items-center">
              <BookText className="h-4 w-4 mr-1" />
              {manga.volumes} volumes
            </div>
          )}
          <div className="text-xs text-gray-400">
            {manga.status} • {manga.year}
          </div>
        </div>
      </div>
    </div>
  );
}
