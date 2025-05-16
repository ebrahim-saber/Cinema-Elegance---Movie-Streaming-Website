import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Film } from 'lucide-react';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getMoviesByGenre } from '../services/api';
import { Movie } from '../types/movie';
import MovieGrid from '../components/movie/MovieGrid';

const CategoryPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('popularity');
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        let fetchedMovies: Movie[] = [];
        
        if (genre) {
          // Fetch movies based on category type
          if (genre === 'popular') {
            fetchedMovies = await getPopularMovies();
          } else if (genre === 'top_rated') {
            fetchedMovies = await getTopRatedMovies();
          } else if (genre === 'upcoming') {
            fetchedMovies = await getUpcomingMovies();
          } else {
            // Assume it's a genre ID
            fetchedMovies = await getMoviesByGenre(genre);
          }
        }
        
        setMovies(fetchedMovies);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error fetching movies by category:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
    // Scroll to top when the genre changes
    window.scrollTo(0, 0);
  }, [genre]);
  
  // Sort the movies based on selected option
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === 'popularity') {
      return b.vote_average - a.vote_average;
    } else if (sortOption === 'release_date') {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    } else if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  // Get formatted category title
  const getCategoryTitle = (): string => {
    if (genre === 'popular') return 'Popular Movies';
    if (genre === 'top_rated') return 'Top Rated Movies';
    if (genre === 'upcoming') return 'Upcoming Movies';
    
    // For genre IDs, try to find a corresponding name in the mock data
    const genreMap: Record<string, string> = {
      '28': 'Action Movies',
      '12': 'Adventure Movies',
      '16': 'Animation Movies',
      '35': 'Comedy Movies',
      '80': 'Crime Movies',
      '18': 'Drama Movies',
      '10751': 'Family Movies',
      '14': 'Fantasy Movies',
      '36': 'History Movies',
      '27': 'Horror Movies',
    };
    
    return genreMap[genre || ''] || 'Movies';
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <Film size={48} className="text-gold-primary animate-pulse mb-4" />
            <p className="text-gray-400 text-xl">Loading movies...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="text-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-gray-300 text-xl mb-2">Something went wrong</p>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                {getCategoryTitle()}
              </h1>
              
              {/* Sort Options */}
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Filter size={18} className="text-gold-primary mr-2" />
                  <span className="text-gray-300">Sort by:</span>
                </div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-dark-700 text-gray-200 px-3 py-2 rounded-md border border-dark-600 focus:outline-none focus:ring-1 focus:ring-gold-primary"
                >
                  <option value="popularity">Popularity</option>
                  <option value="release_date">Release Date</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </header>
            
            {/* Movie Grid */}
            {sortedMovies.length > 0 ? (
              <MovieGrid movies={sortedMovies} className="mb-10" />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No movies found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;