import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { useMangaStore } from '../../store/useMangaStore';
import { analyzeAnimePreferences } from '../../services/aiService';

const EXAMPLE_PROMPTS = [
  "Something like Berserk with dark themes",
  "A romantic manga about high school life",
  "A psychological thriller manga",
  "A feel-good slice of life manga",
  "The best modern action manga",
  "Classic manga with deep storylines",
];

export function MangaPrompt() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updatePreferences } = useMangaStore();

  const analyzePrompt = async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the same AI service as anime for now
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

      // Update preferences
      updatePreferences({
        favoriteGenres: aiResult.genres,
        minimumRating: minRating,
        yearRange: yearRange,
      });

    } catch (error) {
      console.error('Error analyzing prompt:', error);
      setError('Something went wrong. Please try again.');
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
          Describe Your Perfect Manga
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell us what kind of manga you're looking for... (e.g., 'Something like Berserk' or 'A romantic manga with school life')"
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
                <span>Finding Manga...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Find Manga</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
