import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import './App.css';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app min-h-screen bg-dark-900 text-gray-100 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/category/:genre" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/watch/:id" element={<WatchPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;