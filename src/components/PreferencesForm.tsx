import React from 'react';
import { Sliders, Tag, Calendar, Star } from 'lucide-react';
import { useAnimeStore } from '../store/useAnimeStore';

const AVAILABLE_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi',
  'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
];

export function PreferencesForm() {
  const { preferences, updatePreferences } = useAnimeStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-white" />
          <h2 className="text-lg font-semibold text-white">Customize Your Recommendations</h2>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Genre Selection */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="h-4 w-4 text-indigo-500" />
            <label className="block text-sm font-medium text-gray-700">
              Favorite Genres
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  const newGenres = preferences.favoriteGenres.includes(genre)
                    ? preferences.favoriteGenres.filter((g) => g !== genre)
                    : [...preferences.favoriteGenres, genre];
                  updatePreferences({ favoriteGenres: newGenres });
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                  preferences.favoriteGenres.includes(genre)
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-indigo-500" />
              <label className="block text-sm font-medium text-gray-700">
                Minimum Rating
              </label>
            </div>
            <span className="text-sm font-medium text-indigo-600">
              {preferences.minimumRating.toFixed(1)}+
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="10"
            step="0.1"
            value={preferences.minimumRating}
            onChange={(e) =>
              updatePreferences({ minimumRating: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5.0</span>
            <span>7.5</span>
            <span>10.0</span>
          </div>
        </div>

        {/* Year Range */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <label className="block text-sm font-medium text-gray-700">
              Release Year Range
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <input
                type="number"
                min="1960"
                max={new Date().getFullYear()}
                value={preferences.yearRange.start}
                onChange={(e) =>
                  updatePreferences({
                    yearRange: {
                      ...preferences.yearRange,
                      start: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <input
                type="number"
                min="1960"
                max={new Date().getFullYear()}
                value={preferences.yearRange.end}
                onChange={(e) =>
                  updatePreferences({
                    yearRange: {
                      ...preferences.yearRange,
                      end: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() =>
              updatePreferences({
                favoriteGenres: [],
                minimumRating: 7,
                yearRange: {
                  start: 1990,
                  end: new Date().getFullYear(),
                },
              })
            }
            className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}