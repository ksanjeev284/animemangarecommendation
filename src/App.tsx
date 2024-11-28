import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Tv2, Sparkles, Book } from 'lucide-react';
import { AnimePrompt } from './components/AnimePrompt';
import { AnimeList } from './components/AnimeList';
import { PreferencesForm } from './components/PreferencesForm';
import { SearchBar } from './components/SearchBar';
import { FilterTags } from './components/FilterTags';
import { useAnimeStore } from './store/useAnimeStore';
import { fetchTopAnime, fetchSeasonalAnime } from './services/api';
import AnimePage from './pages/AnimePage';
import MangaPage from './pages/MangaPage';

function App() {
  const { setAnimeList } = useAnimeStore();

  useEffect(() => {
    const loadAnime = async () => {
      try {
        // Fetch both top and seasonal anime
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
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Tv2 className="h-8 w-8 text-indigo-500" />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                      AniRec
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 font-medium">AI-Powered</span>
                    </div>
                    <Link
                      to="/manga"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Book className="h-5 w-5 mr-2" />
                      Explore Manga
                    </Link>
                  </div>
                </nav>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Your Next Favorite Anime</h2>
                <p className="text-gray-600 mb-6">Tell us what you like, and we'll find the perfect anime for you!</p>
                
                {/* Manga promotion banner */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mt-8 shadow-sm">
                  <p className="text-gray-800">
                    Love reading manga? Visit{' '}
                    <Link
                      to="/manga"
                      className="text-purple-600 font-semibold hover:text-purple-700 underline"
                    >
                      MangaRec
                    </Link>
                    {' '}for personalized manga recommendations!
                  </p>
                </div>
              </div>

              <AnimePrompt />

              <div className="mb-8">
                <SearchBar />
                <FilterTags />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <PreferencesForm />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <AnimeList />
                </div>
              </div>
            </main>

            <footer className="bg-white mt-16 border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500">
                  Powered by Jikan API • Made with ❤️ for anime fans
                </p>
              </div>
            </footer>
          </div>
        } />
        <Route path="/manga" element={
          <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Book className="h-8 w-8 text-purple-500" />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
                      MangaRec
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 font-medium">AI-Powered</span>
                    </div>
                    <Link
                      to="/"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Tv2 className="h-5 w-5 mr-2" />
                      Explore Anime
                    </Link>
                  </div>
                </nav>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Your Next Favorite Manga</h2>
                <p className="text-gray-600 mb-6">Tell us what you like, and we'll find the perfect manga for you!</p>
                
                {/* Anime promotion banner */}
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 mt-8 shadow-sm">
                  <p className="text-gray-800">
                    Love watching anime? Visit{' '}
                    <Link
                      to="/"
                      className="text-indigo-600 font-semibold hover:text-indigo-700 underline"
                    >
                      AniRec
                    </Link>
                    {' '}for personalized anime recommendations!
                  </p>
                </div>
              </div>
              <MangaPage />
            </main>

            <footer className="bg-white mt-16 border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500">
                  Powered by Jikan API • Made with ❤️ for manga fans
                </p>
              </div>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;