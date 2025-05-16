import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Download, 
  Calendar, 
  Clock, 
  Star,
  Heart
} from 'lucide-react';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieDetails } from '../types/movie';
import MovieGrid from '../components/movie/MovieGrid';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data);
        }
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
        console.error('Error fetching movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-gold-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center">
        <div className="text-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-gray-300 text-xl mb-2">Movie Not Found</p>
        <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist or is unavailable.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Format the release date
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format runtime (minutes to hours and minutes)
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // In a real app, these would be proper links to the images from the API
  const backdropUrl = getImageUrl(movie.backdrop_path) || 
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  const posterUrl = getImageUrl(movie.poster_path, 'w500') || 
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <div className="pt-16 film-grain">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-dark-900/30" />
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative -mt-40 md:-mt-64 z-10 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={posterUrl} 
                  alt={movie.title} 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex flex-col space-y-3">
                <Link 
                  to={`/watch/${movie.id}`} 
                  className="btn-primary flex items-center justify-center"
                >
                  <Play size={18} className="mr-2" />
                  Watch Now
                </Link>
                <button className="btn-secondary flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Download
                </button>
                <button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-600 text-gray-300 hover:bg-dark-700 transition-colors duration-300">
                  <Heart size={18} className="mr-2" />
                  Add to Favorites
                </button>
              </div>
            </div>
            
            {/* Movie Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-3">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-gold-light text-lg italic mb-4">
                  "{movie.tagline}"
                </p>
              )}
              
              {/* Movie Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Star size={18} className="text-gold-primary mr-1" />
                  <span className="text-gray-200">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-300 mr-1" />
                  <span className="text-gray-200">{releaseDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-300 mr-1" />
                  <span className="text-gray-200">{formatRuntime(movie.runtime)}</span>
                </div>
              </div>
              
              {/* Genres */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <Link 
                      key={genre.id} 
                      to={`/category/${genre.id}`}
                      className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gold-primary hover:text-dark-900 transition-colors duration-300"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-3">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              
              {/* Cast */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
                  {movie.cast.map(person => (
                    <div key={person.id} className="flex-shrink-0 w-32">
                      <div className="rounded-lg overflow-hidden bg-dark-700 aspect-[2/3] mb-2">
                        {person.profile_path ? (
                          <img 
                            src={getImageUrl(person.profile_path, 'w200') || 
                              'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                            alt={person.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-200 text-sm">{person.name}</h3>
                      <p className="text-gray-400 text-xs">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Trailer */}
              {movie.videos && movie.videos.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-medium mb-4">Trailer</h2>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                      title={movie.videos[0].name}
                      allowFullScreen
                      className="border-0"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <MovieGrid 
            movies={movie.similar} 
            title="You May Also Like" 
            className="mb-12"
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;