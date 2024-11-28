export const AVAILABLE_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
  'Thriller'
] as const;

export const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_MIN_YEAR = 1990;

export const RATING_STEPS = [
  { value: 5, label: '5+' },
  { value: 6, label: '6+' },
  { value: 7, label: '7+' },
  { value: 8, label: '8+' },
  { value: 9, label: '9+' }
] as const;