import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { getMovieDetails } from '../services/api';
import { MovieDetails } from '../types/movie';
import VideoPlayer from '../components/movie/VideoPlayer';
import MovieGrid from '../components/movie/MovieGrid';

const WatchPage: React.FC = () => {
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
        setError('Failed to load movie. Please try again later.');
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
        <p className="text-gray-300 text-xl mb-2">Video Not Available</p>
        <p className="text-gray-400 mb-6">The movie you're trying to watch is currently unavailable.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  // In a real app, this would be a real video URL for the movie
  // For this demo, we'll use a sample video
  const videoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  return (
    <div className="pt-20 pb-12 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to={`/movie/${movie.id}`}
            className="text-gray-300 hover:text-gold-primary inline-flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to details
          </Link>
        </div>
        
        {/* Movie Title */}
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
          {movie.title}
        </h1>
        
        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer 
            videoUrl={videoUrl} 
            posterUrl={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} 
            title={movie.title}
          />
        </div>
        
        {/* Download Button */}
        <div className="mb-12">
          <a 
            href={videoUrl} 
            download
            className="btn-secondary inline-flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download Movie
          </a>
        </div>
        
        {/* Movie Description */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-3">About the movie</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            {movie.overview}
          </p>
        </div>
        
        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <MovieGrid 
            movies={movie.similar} 
            title="You May Also Like" 
            className="mb-10"
          />
        )}
      </div>
    </div>
  );
};

export default WatchPage;