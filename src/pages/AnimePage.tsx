import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tv2, Book } from 'lucide-react';
import { AnimePrompt } from '../components/AnimePrompt';
import { AnimeList } from '../components/AnimeList';
import { PreferencesForm } from '../components/PreferencesForm';
import { useAnimeStore } from '../store/useAnimeStore';
import { fetchTopAnime, fetchSeasonalAnime } from '../services/api';

function AnimePage() {
  const { setAnimeList } = useAnimeStore();

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const [topAnime, seasonalAnime] = await Promise.all([
          fetchTopAnime(),
          fetchSeasonalAnime()
        ]);

        // Combine and remove duplicates
        const combinedAnime = [...topAnime, ...seasonalAnime];
        const uniqueAnime = Array.from(new Map(combinedAnime.map(item => [item.id, item])).values());
        
        setAnimeList(uniqueAnime);
      } catch (error) {
        console.error('Error loading anime:', error);
      }
    };

    loadAnime();
  }, [setAnimeList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 relative">
          <Link
            to="/manga"
            className="absolute right-0 top-0 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Book className="h-5 w-5 mr-2" />
            Explore Manga
          </Link>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Tv2 className="h-8 w-8 mr-2" />
              AniRec
            </h1>
            <p className="text-lg text-gray-600">
              Discover your next favorite anime with AI-powered recommendations
            </p>
          </div>
          
          {/* New manga promotion banner */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-8 shadow-sm">
            <p className="text-gray-800">
              Love reading? Check out our{' '}
              <Link
                to="/manga"
                className="text-purple-600 font-semibold hover:text-purple-700 underline"
              >
                Manga Recommendations
              </Link>
              {' '}for the best manga series!
            </p>
          </div>
        </header>

        <main>
          <AnimePrompt />
          <PreferencesForm />
          <AnimeList />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Jikan API</p>
        </footer>
      </div>
    </div>
  );
}

export default AnimePage;
