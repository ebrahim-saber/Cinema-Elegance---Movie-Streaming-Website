import axios from 'axios';
import { Movie, MovieDetails, Genre } from '../types/movie';

// This would normally be in an environment variable
const API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// For demo purposes, we're using axios but the actual API calls are mocked
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper to get image URL
export const getImageUrl = (path: string | null, size: string = 'original') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get popular movies
export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  // For demo purposes, we'll return mock data
  return mockPopularMovies;
};

// Get top rated movies
export const getTopRatedMovies = async (page: number = 1): Promise<Movie[]> => {
  return mockPopularMovies.slice().sort((a, b) => b.vote_average - a.vote_average);
};

// Get upcoming movies
export const getUpcomingMovies = async (page: number = 1): Promise<Movie[]> => {
  return mockPopularMovies.slice().reverse();
};

// Get movie details
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  const movie = mockPopularMovies.find(m => m.id.toString() === id);
  if (!movie) return null;
  
  return {
    ...movie,
    genres: mockGenres.slice(0, 3),
    runtime: 120,
    tagline: "Experience the magic of cinema",
    overview: movie.overview || "A captivating cinematic experience that will leave you breathless.",
    cast: mockCast,
    similar: mockPopularMovies.filter(m => m.id !== parseInt(id)).slice(0, 6),
    videos: [{
      key: 'dQw4w9WgXcQ',
      name: 'Official Trailer',
      type: 'Trailer'
    }]
  };
};

// Search movies
export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  return mockPopularMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: string, page: number = 1): Promise<Movie[]> => {
  return mockPopularMovies;
};

// Get genres list
export const getGenres = async (): Promise<Genre[]> => {
  return mockGenres;
};

// Mock data
const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
];

const mockCast = [
  { id: 1, name: 'Leonardo DiCaprio', character: 'John Doe', profile_path: '/example.jpg' },
  { id: 2, name: 'Brad Pitt', character: 'Mike Smith', profile_path: '/example2.jpg' },
  { id: 3, name: 'Margot Robbie', character: 'Jane Smith', profile_path: '/example3.jpg' },
  { id: 4, name: 'Jennifer Lawrence', character: 'Sarah Connor', profile_path: '/example4.jpg' },
];

const mockPopularMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    release_date: '2010-07-16',
    vote_average: 8.4,
    genre_ids: [28, 12, 878]
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    release_date: '1994-09-23',
    vote_average: 8.7,
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    release_date: '1972-03-14',
    vote_average: 8.7,
    genre_ids: [18, 80]
  },
  {
    id: 4,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    release_date: '2008-07-16',
    vote_average: 8.5,
    genre_ids: [28, 80, 18]
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    release_date: '1994-10-14',
    vote_average: 8.5,
    genre_ids: [53, 80]
  },
  {
    id: 6,
    title: 'Fight Club',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/rr7E0NoGKxvbkb8Heitq7bujVcX.jpg',
    overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    release_date: '1999-10-15',
    vote_average: 8.4,
    genre_ids: [18]
  },
  {
    id: 7,
    title: 'Forrest Gump',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop_path: '/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
    overview: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    release_date: '1994-07-06',
    vote_average: 8.5,
    genre_ids: [35, 18, 10749]
  },
  {
    id: 8,
    title: 'The Matrix',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    overview: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    release_date: '1999-03-30',
    vote_average: 8.2,
    genre_ids: [28, 878]
  }
];