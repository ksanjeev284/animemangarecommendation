import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { useAnimeStore } from '../store/useAnimeStore';
import { analyzeAnimePreferences } from '../services/aiService';

const EXAMPLE_PROMPTS = [
  "Something like Attack on Titan with dark themes and action",
  "A romantic comedy with school life",
  "A psychological thriller that makes you think",
  "A feel-good slice of life anime",
  "The best modern action anime",
  "Classic anime with deep storylines",
];

// Backup keyword system in case AI service is unavailable
const GENRE_KEYWORDS = {
  'Action': ['action', 'fighting', 'battle', 'combat', 'warrior', 'war'],
  'Adventure': ['adventure', 'journey', 'quest', 'explore', 'travel'],
  'Comedy': ['comedy', 'funny', 'humor', 'hilarious', 'laugh'],
  'Drama': ['drama', 'emotional', 'serious', 'dramatic'],
  'Fantasy': ['fantasy', 'magic', 'magical', 'dragon', 'mythical'],
  'Horror': ['horror', 'scary', 'dark', 'creepy', 'gore', 'terrifying'],
  'Mystery': ['mystery', 'detective', 'solve', 'case', 'suspense'],
  'Psychological': ['psychological', 'mind', 'complex', 'thinking', 'deep'],
  'Romance': ['romance', 'love', 'relationship', 'romantic'],
  'Sci-Fi': ['sci-fi', 'science fiction', 'future', 'space', 'technology'],
  'Slice of Life': ['slice of life', 'daily life', 'peaceful', 'relaxing', 'school life'],
  'Sports': ['sports', 'athlete', 'game', 'competition', 'team'],
  'Supernatural': ['supernatural', 'ghost', 'spirit', 'power', 'ability'],
  'Thriller': ['thriller', 'suspense', 'intense', 'thrilling']
};

function fallbackGenreExtraction(text: string): string[] {
  const lowercaseText = text.toLowerCase();
  const genres = new Set<string>();

  Object.entries(GENRE_KEYWORDS).forEach(([genre, keywords]) => {
    if (keywords.some(keyword => lowercaseText.includes(keyword.toLowerCase()))) {
      genres.add(genre);
    }
  });

  return Array.from(genres);
}

export function AnimePrompt() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updatePreferences } = useAnimeStore();

  const analyzePrompt = async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to use AI service first
      const aiResult = await analyzeAnimePreferences(text);
      
      // Convert AI results to preferences
      const currentYear = new Date().getFullYear();
      const yearRange = aiResult.yearPreference === 'modern'
        ? { start: 2015, end: currentYear }
        : aiResult.yearPreference === 'classic'
        ? { start: 1990, end: 2010 }
        : { start: 2000, end: currentYear };

      const minRating = aiResult.qualityThreshold === 'high'
        ? 8.5
        : aiResult.qualityThreshold === 'medium'
        ? 7.5
        : 7.0;

      // If AI didn't find any genres, use fallback
      const genres = aiResult.genres.length > 0
        ? aiResult.genres
        : fallbackGenreExtraction(text);

      // Update preferences
      updatePreferences({
        favoriteGenres: genres,
        minimumRating: minRating,
        yearRange: yearRange,
      });

    } catch (error) {
      console.error('Error analyzing prompt:', error);
      setError('Something went wrong. Using backup recommendation system...');
      
      // Use fallback system
      const genres = fallbackGenreExtraction(text);
      updatePreferences({
        favoriteGenres: genres,
        minimumRating: 7.0,
        yearRange: {
          start: 2000,
          end: new Date().getFullYear(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      analyzePrompt(prompt.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          Describe Your Perfect Anime
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell us what kind of anime you're looking for... (e.g., 'Something like Attack on Titan' or 'A romantic comedy with school life')"
            className="w-full h-24 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {error && (
          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Try: "{EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)]}"
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg
              ${isLoading || !prompt.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'}
              transition-colors duration-200
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Finding Anime...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Find Anime</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
