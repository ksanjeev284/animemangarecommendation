import axios from 'axios';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

export async function fetchTopAnime() {
  const response = await axios.get(`${JIKAN_API_BASE}/top/anime`);
  return response.data.data.map(transformAnimeData);
}

export async function searchAnime(query) {
  const response = await axios.get(`${JIKAN_API_BASE}/anime`, {
    params: { q: query }
  });
  return response.data.data.map(transformAnimeData);
}

function transformAnimeData(anime) {
  return {
    id: anime.mal_id,
    title: anime.title,
    genre: anime.genres.map(g => g.name),
    rating: anime.score || 0,
    imageUrl: anime.images.jpg.image_url,
    description: anime.synopsis,
    year: new Date(anime.aired.from).getFullYear(),
  };
}