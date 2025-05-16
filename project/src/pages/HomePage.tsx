import React from 'react';
import { Film } from 'lucide-react';
import HeroMovie from '../components/movie/HeroMovie';
import MovieGrid from '../components/movie/MovieGrid';
import { useMovies } from '../contexts/MovieContext';

const LoadingState = () => (
  <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
    <Film size={48} className="text-gold-primary animate-pulse mb-4" />
    <p className="text-gray-400 text-xl">Loading the finest selection of films...</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
    <div className="text-error mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p className="text-gray-300 text-xl mb-2">Oops! Something went wrong.</p>
    <p className="text-gray-400">{message}</p>
  </div>
);

const HomePage: React.FC = () => {
  const { 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies, 
    isLoading, 
    error 
  } = useMovies();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  // Featured movie for the hero section (first popular movie)
  const featuredMovie = popularMovies[0];

  return (
    <div className="pt-16 pb-8">
      {/* Hero Section */}
      {featuredMovie && <HeroMovie movie={featuredMovie} />}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Popular Movies */}
        <MovieGrid 
          movies={popularMovies} 
          title="Popular Movies" 
          className="pt-8"
        />
        
        {/* Top Rated Movies */}
        <MovieGrid 
          movies={topRatedMovies} 
          title="Top Rated" 
        />
        
        {/* Upcoming Movies */}
        <MovieGrid 
          movies={upcomingMovies} 
          title="Coming Soon" 
        />
      </div>
    </div>
  );
};

export default HomePage;