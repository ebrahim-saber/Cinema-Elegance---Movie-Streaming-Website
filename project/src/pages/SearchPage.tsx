import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Film } from 'lucide-react';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movie';
import MovieGrid from '../components/movie/MovieGrid';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        if (query) {
          const results = await searchMovies(query);
          setMovies(results);
        } else {
          setMovies([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to search movies. Please try again later.');
        console.error('Error searching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
    // Scroll to top when the search query changes
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Search Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-400 text-lg flex items-center">
              <SearchIcon size={18} className="mr-2" />
              <span>
                Showing results for: <span className="text-gold-primary">"{query}"</span>
              </span>
            </p>
          )}
        </header>
        
        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <Film size={48} className="text-gold-primary animate-pulse mb-4" />
            <p className="text-gray-400 text-xl">Searching for movies...</p>
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
            <p className="text-gray-300 text-xl mb-2">Search failed</p>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid 
            movies={movies} 
            className="mb-10" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="mb-4 text-gray-400">
              <SearchIcon size={48} />
            </div>
            <p className="text-gray-300 text-xl mb-2">No movies found</p>
            <p className="text-gray-400 max-w-lg">
              We couldn't find any movies matching "{query}". 
              Try a different search term or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;