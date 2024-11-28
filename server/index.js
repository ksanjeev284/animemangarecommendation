import express from 'express';
import cors from 'cors';
import { fetchTopAnime, searchAnime } from './services/animeService.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get top anime
app.get('/api/anime/top', async (req, res) => {
  try {
    const topAnime = await fetchTopAnime();
    res.json(topAnime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search anime
app.get('/api/anime/search', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchAnime(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});