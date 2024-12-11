import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Tv2 } from 'lucide-react';
import { MangaPrompt } from '../components/manga/MangaPrompt';
import { MangaList } from '../components/manga/MangaList';
import { MangaPreferencesForm } from '../components/manga/MangaPreferencesForm';
import { useMangaStore } from '../store/useMangaStore';
import { fetchTopManga } from '../services/api';

function MangaPage() {
  const { setMangaList } = useMangaStore();

  useEffect(() => {
    const loadManga = async () => {
      try {
        const manga = await fetchTopManga();
        setMangaList(manga);
      } catch (error) {
        console.error('Error loading manga:', error);
      }
    };

    loadManga();
  }, [setMangaList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 relative">
          <Link
            to="/"
            className="absolute right-0 top-0 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Tv2 className="h-5 w-5 mr-2" />
            Explore Anime
          </Link>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Book className="h-8 w-8 mr-2" />
              MangaRec
            </h1>
            <p className="text-lg text-gray-600">
              Discover your next favorite manga with AI-powered recommendations
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 mb-8 shadow-sm">
            <p className="text-gray-800">
              Love watching anime? Check out our{' '}
              <Link
                to="/"
                className="text-indigo-600 font-semibold hover:text-indigo-700 underline"
              >
                Anime Recommendations
              </Link>
              {' '}for the best anime series!
            </p>
          </div>
        </header>

        <main>
          <MangaPrompt />
          <MangaPreferencesForm />
          <MangaList />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Jikan API</p>
        </footer>
      </div>
    </div>
  );
}

export default MangaPage;
