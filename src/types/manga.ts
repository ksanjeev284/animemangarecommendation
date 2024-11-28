export interface Manga {
  id: number;
  title: string;
  genre: string[];
  rating: number;
  imageUrl: string;
  description: string;
  year: number;
  status: string;
  chapters?: number;
  volumes?: number;
}
