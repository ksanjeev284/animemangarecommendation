import React from 'react';
import { Star, Calendar, Tag } from 'lucide-react';
import { Anime } from '../types/anime';
import { Link } from 'react-router-dom';
import { useWatchlistStore } from '../store/useWatchlistStore';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlistStore();
  const isInWatchlist = watchlist.some((a) => a.id === anime.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) removeFromWatchlist(anime.id);
    else addToWatchlist(anime);
  };

  return (
    <Link to={`/anime/${anime.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={anime.imageUrl}
            alt={anime.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{anime.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {anime.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{anime.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{anime.genre[0]}</span>
              {anime.genre.length > 1 && (
                <span className="text-gray-400">+{anime.genre.length - 1}</span>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {anime.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {anime.genre.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          <button
            onClick={handleClick}
            className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </Link>
  );
}

