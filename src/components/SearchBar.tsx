import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAnimeStore } from '../store/useAnimeStore';
import { searchAnime } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from 'react-query';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { setAnimeList, setError } = useAnimeStore();

  useQuery(
    ['searchAnime', debouncedQuery],
    () => searchAnime(debouncedQuery),
    {
      enabled: debouncedQuery.length > 0,
      onSuccess: (data) => {
        setAnimeList(data);
        setError(null);
      },
      onError: (error: Error) => {
        setError(error.message);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anime..."
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
}