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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Book className="h-8 w-8 mr-2" />
              MangaRec
            </h1>
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
