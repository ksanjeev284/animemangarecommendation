import React, { useEffect } from 'react';
import { Sliders } from 'lucide-react';
import { useMangaStore } from '../../store/useMangaStore';

const MANGA_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
  'Supernatural', 'Thriller', 'Sports', 'Psychological'
];

export function MangaPreferencesForm() {
  const { mangaList, preferences, updatePreferences, setFilteredManga } = useMangaStore();

  useEffect(() => {
    const filtered = mangaList.filter((manga) => {
      // Filter by rating
      if (manga.rating < preferences.minimumRating) return false;

      // Filter by year
      const year = manga.year;
      if (year < preferences.yearRange.start || year > preferences.yearRange.end) return false;

      // Filter by genres
      if (preferences.favoriteGenres.length > 0) {
        return preferences.favoriteGenres.some((genre) =>
          manga.genre.includes(genre)
        );
      }

      return true;
    });

    setFilteredManga(filtered);
  }, [mangaList, preferences, setFilteredManga]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Sliders className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          Customize Your Preferences
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={preferences.minimumRating}
            onChange={(e) =>
              updatePreferences({ minimumRating: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="text-sm text-gray-500 mt-1">
            {preferences.minimumRating.toFixed(1)} or higher
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Range
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1950"
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
              className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              min="1950"
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
              className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favorite Genres
          </label>
          <div className="flex flex-wrap gap-2">
            {MANGA_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  const newGenres = preferences.favoriteGenres.includes(genre)
                    ? preferences.favoriteGenres.filter((g) => g !== genre)
                    : [...preferences.favoriteGenres, genre];
                  updatePreferences({ favoriteGenres: newGenres });
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  preferences.favoriteGenres.includes(genre)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            updatePreferences({
              favoriteGenres: [],
              minimumRating: 0,
              yearRange: {
                start: 1990,
                end: new Date().getFullYear(),
              },
            })
          }
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset Preferences
        </button>
      </div>
    </div>
  );
}
