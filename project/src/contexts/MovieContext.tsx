import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Movie, Genre } from '../types/movie';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getGenres } from '../services/api';

interface MovieContextType {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
}

const MovieContext = createContext<MovieContextType>({
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  genres: [],
  isLoading: false,
  error: null,
});

export const useMovies = () => useContext(MovieContext);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [popular, topRated, upcoming, genresList] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getGenres(),
        ]);

        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setGenres(genresList);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie data. Please try again later.');
        console.error('Error fetching initial movie data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        genres,
        isLoading,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};