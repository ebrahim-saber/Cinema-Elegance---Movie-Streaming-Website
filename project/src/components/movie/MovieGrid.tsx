import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  className?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title, 
  className = '' 
}) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">No movies found.</p>
      </div>
    );
  }

  return (
    <div className={`my-8 ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-gray-100">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;