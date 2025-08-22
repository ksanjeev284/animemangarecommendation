import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchAnimeById, fetchAnimeBySlug, fetchAnimeReviews } from '../services/api';
import { Anime } from '../types/anime';
import { Review } from '../types/review';
import { useAnimeStore } from '../store/useAnimeStore';

export default function AnimeDetailPage() {
  const { slug } = useParams();
  const { animeList } = useAnimeStore();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      let data: Anime | null = null;
      // Find anime by slug from the list
      const found = animeList.find(a => a.slug === slug);
      if (found) {
        // Fetch full details by ID
        data = await fetchAnimeById(found.id);
      } else if (slug) {
        data = await fetchAnimeBySlug(slug);
      }
      setAnime(data);
      if (data) {
        const reviewData = await fetchAnimeReviews(data.id);
        setReviews(reviewData);
      }
      setLoading(false);
    }
    loadAnime();
  }, [slug, animeList]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!anime) return <div className="text-center py-12">Anime not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>{anime.title} | Anime Details | AnimeTrend</title>
        <meta name="description" content={anime.description} />
        <link rel="canonical" href={`https://www.animetrend.in/anime/${anime.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TVSeries',
          'name': anime.title,
          'description': anime.description,
          'image': anime.imageUrl,
          'genre': anime.genre,
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': anime.rating,
            'bestRating': 10,
            'ratingCount': 1
          },
          'datePublished': anime.year
        })}</script>
      </Helmet>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={anime.imageUrl} alt={anime.title} className="w-64 h-auto rounded-lg shadow-md" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            <div className="mb-2 text-gray-600">{anime.genre.join(', ')}</div>
            <div className="mb-2 text-yellow-600 font-semibold">Rating: {anime.rating}</div>
            <div className="mb-2 text-gray-500">Year: {anime.year}</div>
            <p className="mt-4 text-gray-800">{anime.description}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews available.</p>
          ) : (
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="font-semibold">{review.author}</div>
                  <div className="text-yellow-600">Score: {review.score}</div>
                  <p className="mt-2 text-gray-700">{review.text}</p>
                </div>
              ))}
              <a
                href={`https://myanimelist.net/anime/${anime.id}/reviews`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                See more reviews on MyAnimeList
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }