import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Download, Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/api';

interface HeroMovieProps {
  movie: Movie;
}

const HeroMovie: React.FC<HeroMovieProps> = ({ movie }) => {
  const backdropUrl = getImageUrl(movie.backdrop_path) || 
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] film-grain">
      <div className="absolute inset-0 z-0">
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center">
              <Star size={20} className="text-gold-primary mr-2" />
              <span className="text-gray-200 text-lg">{movie.vote_average.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-300 mr-2" />
              <span className="text-gray-200 text-lg">{releaseDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={20} className="text-gray-300 mr-2" />
              <span className="text-gray-200 text-lg">2h 15m</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg mb-8 line-clamp-3 md:line-clamp-none leading-relaxed">
            {movie.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/watch/${movie.id}`}
              className="btn-primary flex items-center px-8 py-3 text-lg"
            >
              <Play size={20} className="mr-2" />
              Watch Now
            </Link>
            <Link 
              to={`/movie/${movie.id}`}
              className="btn-secondary flex items-center px-8 py-3 text-lg"
            >
              <Download size={20} className="mr-2" />
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMovie;