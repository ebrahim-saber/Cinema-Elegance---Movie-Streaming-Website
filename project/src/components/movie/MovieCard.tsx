import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock } from 'lucide-react';
import { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/api';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'w500') || 
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  return (
    <div className={`movie-card relative overflow-hidden rounded-lg group ${className}`}>
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="movie-card-overlay absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent p-6 flex flex-col justify-end">
            <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              <div className="flex items-center mb-2 space-x-4">
                <div className="flex items-center">
                  <Star size={16} className="text-gold-primary mr-1" />
                  <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">2h 15m</span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium line-clamp-2 mb-3">{movie.title}</h3>
              
              <p className="text-sm text-gray-400 line-clamp-3 mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {movie.overview}
              </p>
              
              <button className="flex items-center justify-center bg-gold-primary text-dark-900 rounded-full w-12 h-12 hover:bg-gold-light transition-colors duration-300">
                <Play size={20} fill="currentColor" className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;