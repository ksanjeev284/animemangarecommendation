import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchMangaById } from '../services/api';
import { Manga } from '../types/manga';

export default function MangaDetailPage() {
  const { id } = useParams();
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadManga() {
      setLoading(true);
      const data = await fetchMangaById(Number(id));
      setManga(data);
      setLoading(false);
    }
    loadManga();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!manga) return <div className="text-center py-12">Manga not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>{manga.title} | Manga Details | AnimeTrend</title>
        <meta name="description" content={manga.description} />
        <link rel="canonical" href={`https://www.animetrend.in/manga/${manga.id}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BookSeries',
          'name': manga.title,
          'description': manga.description,
          'image': manga.imageUrl,
          'genre': manga.genre,
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': manga.rating,
            'bestRating': 10,
            'ratingCount': 1
          },
          'datePublished': manga.year
        })}</script>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={manga.imageUrl} alt={manga.title} className="w-64 h-auto rounded-lg shadow-md" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
          <div className="mb-2 text-gray-600">{manga.genre.join(', ')}</div>
          <div className="mb-2 text-yellow-600 font-semibold">Rating: {manga.rating}</div>
          <div className="mb-2 text-gray-500">Year: {manga.year}</div>
          <p className="mt-4 text-gray-800">{manga.description}</p>
        </div>
      </div>
    </div>
  );
} 