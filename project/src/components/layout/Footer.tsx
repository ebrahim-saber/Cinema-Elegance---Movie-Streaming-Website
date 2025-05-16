import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Twitter, Instagram, Facebook, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 text-gray-400 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <Film size={24} className="text-gold-primary mr-2" />
              <span className="text-gold-primary font-playfair text-xl font-bold">
                CinemaElegance
              </span>
            </Link>
            <p className="max-w-md text-sm">
              Experience cinema in its purest form with our classic, elegant movie streaming platform.
              Enjoy handpicked films from around the world in stunning quality.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gold-primary transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-gray-200 font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/category/action" className="hover:text-gold-primary transition-colors duration-300">Action</Link></li>
                <li><Link to="/category/drama" className="hover:text-gold-primary transition-colors duration-300">Drama</Link></li>
                <li><Link to="/category/comedy" className="hover:text-gold-primary transition-colors duration-300">Comedy</Link></li>
                <li><Link to="/category/horror" className="hover:text-gold-primary transition-colors duration-300">Horror</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-200 font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-gold-primary transition-colors duration-300">Home</Link></li>
                <li><Link to="/category/popular" className="hover:text-gold-primary transition-colors duration-300">Popular</Link></li>
                <li><Link to="/category/top_rated" className="hover:text-gold-primary transition-colors duration-300">Top Rated</Link></li>
                <li><Link to="/category/upcoming" className="hover:text-gold-primary transition-colors duration-300">Upcoming</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-200 font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-gold-primary transition-colors duration-300">FAQ</Link></li>
                <li><Link to="#" className="hover:text-gold-primary transition-colors duration-300">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-gold-primary transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-gold-primary transition-colors duration-300">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CinemaElegance. All rights reserved.
          </p>
          <p className="text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-gold-primary" /> for cinema lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;