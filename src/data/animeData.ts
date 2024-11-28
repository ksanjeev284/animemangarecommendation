import { Anime } from '../types/anime';

export const animeData: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    genre: ["Action", "Drama", "Fantasy"],
    rating: 9.0,
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    description: "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.",
    year: 2013
  },
  {
    id: 2,
    title: "Death Note",
    genre: ["Thriller", "Supernatural", "Psychological"],
    rating: 8.9,
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80",
    description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name while picturing their face.",
    year: 2006
  },
  {
    id: 3,
    title: "My Hero Academia",
    genre: ["Action", "Comedy", "Superhero"],
    rating: 8.4,
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    description: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
    year: 2016
  }
];