import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Download } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, posterUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle progress update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = position * videoRef.current.duration;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Format time (seconds to MM:SS format)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Auto-hide controls after inactivity
  useEffect(() => {
    const showControlsTemporarily = () => {
      setShowControls(true);
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      
      if (isPlaying) {
        controlsTimerRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener('mousemove', showControlsTemporarily);
      playerElement.addEventListener('mouseenter', showControlsTemporarily);
    }
    
    return () => {
      if (playerElement) {
        playerElement.removeEventListener('mousemove', showControlsTemporarily);
        playerElement.removeEventListener('mouseenter', showControlsTemporarily);
      }
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={playerRef} 
      className="video-player-container w-full relative group cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={posterUrl}
        onClick={(e) => e.stopPropagation()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Custom Controls (shown/hidden based on state) */}
      <div 
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-dark-900/70 to-transparent">
          <h2 className="text-white font-medium">{title}</h2>
        </div>
        
        {/* Progress Bar */}
        <div 
          className="progress-bar w-full cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Control Bar */}
        <div className="player-controls p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button 
              className="text-white hover:text-gold-primary"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            {/* Skip Back */}
            <button 
              className="text-white hover:text-gold-primary hidden sm:block"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                }
              }}
            >
              <SkipBack size={20} />
            </button>
            
            {/* Skip Forward */}
            <button 
              className="text-white hover:text-gold-primary hidden sm:block"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.min(
                    videoRef.current.duration, 
                    videoRef.current.currentTime + 10
                  );
                }
              }}
            >
              <SkipForward size={20} />
            </button>
            
            {/* Time Display */}
            <div className="text-white text-sm hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Volume Control */}
            <div className="flex items-center space-x-2 hidden sm:flex">
              <button 
                className="text-white hover:text-gold-primary"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-gold-primary"
              />
            </div>
            
            {/* Download */}
            <a 
              href={videoUrl} 
              download
              className="text-white hover:text-gold-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={20} />
            </a>
            
            {/* Fullscreen */}
            <button 
              className="text-white hover:text-gold-primary"
              onClick={toggleFullscreen}
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Play Big Button (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            className="rounded-full bg-gold-primary/70 text-white w-16 h-16 flex items-center justify-center hover:bg-gold-primary transition-colors duration-300"
            onClick={togglePlay}
          >
            <Play size={30} fill="currentColor" className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;