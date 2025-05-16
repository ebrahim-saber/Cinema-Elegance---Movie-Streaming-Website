import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-800 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Film size={28} className="text-gold-primary mr-2" />
            <span className="text-gold-primary font-playfair text-xl md:text-2xl font-bold">
              CinemaElegance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/category/popular" className="nav-link">Popular</Link>
            <Link to="/category/top_rated" className="nav-link">Top Rated</Link>
            <Link to="/category/upcoming" className="nav-link">Upcoming</Link>
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-dark-700 text-gray-200 px-4 py-2 pr-10 rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-gold-primary"
            />
            <button 
              type="submit" 
              className="absolute right-3 text-gray-400 hover:text-gold-primary"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-200 hover:text-gold-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-800 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="bg-dark-700 text-gray-200 px-4 py-2 pr-10 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-gold-primary"
              />
              <button 
                type="submit" 
                className="absolute right-3 text-gray-400 hover:text-gold-primary"
              >
                <Search size={18} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="nav-link py-2">Home</Link>
              <Link to="/category/popular" className="nav-link py-2">Popular</Link>
              <Link to="/category/top_rated" className="nav-link py-2">Top Rated</Link>
              <Link to="/category/upcoming" className="nav-link py-2">Upcoming</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;