import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Tv2, Sparkles, Book, Mail, FileText, Info, Menu, Calendar } from 'lucide-react';
import { AnimePrompt } from './components/AnimePrompt';
import { AnimeList } from './components/AnimeList';
import { PreferencesForm } from './components/PreferencesForm';
import { SearchBar } from './components/SearchBar';
import { FilterTags } from './components/FilterTags';
import { useAnimeStore } from './store/useAnimeStore';
import { fetchTopAnime, fetchSeasonalAnime } from './services/api';
import MangaPage from './pages/MangaPage';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/policy/AboutPage';
import { PrivacyPage } from './pages/policy/PrivacyPage';
import { TermsPage } from './pages/policy/TermsPage';
import { ContactPage } from './pages/policy/ContactPage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import MangaDetailPage from './pages/MangaDetailPage';
import SeasonalAnimePage from './pages/SeasonalAnimePage';

function QuickLinks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Quick Links"
      >
        <Menu className="h-5 w-5" />
        <span className="text-sm font-medium">Quick Links</span>
      </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <Link
                  to="/seasonal"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Seasonal Anime</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              to="/privacy"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-4 w-4" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              to="/terms"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-4 w-4" />
              <span>Terms of Service</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

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
                    <QuickLinks />
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

            <Footer />
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

            <Footer />
          </div>
        } />
        <Route path="/seasonal" element={<SeasonalAnimePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/anime/:slug" element={<AnimeDetailPage />} />
        <Route path="/manga/:slug" element={<MangaDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;