'use client';

import { useState, useEffect } from 'react';
import { tmdbApi } from '@/lib/api';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';
import { Film, TrendingUp, Award, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const [trendingData, popularData, topRatedData] = await Promise.all([
        tmdbApi.getTrending(),
        tmdbApi.getPopular(),
        tmdbApi.getTopRated(),
      ]);
      setTrending(trendingData.slice(0, 6));
      setPopular(popularData.results.slice(0, 12));
      setTopRated(topRatedData.slice(0, 6));
    } catch (error) {
      console.error('Error loading movies:', error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-black/50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Film size={64} className="mx-auto mb-6 text-primary" />
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              CineVault
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Discover your next favorite movie
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Trending Section */}
        <section className="my-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={28} className="text-primary" />
            <h2 className="text-3xl font-bold text-white">Trending This Week</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-[450px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {trending.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>

        {/* Popular Section */}
        <section className="my-16">
          <div className="flex items-center gap-3 mb-6">
            <Film size={28} className="text-secondary" />
            <h2 className="text-3xl font-bold text-white">Popular Movies</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="skeleton h-[450px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popular.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>

        {/* Top Rated Section */}
        <section className="my-16">
          <div className="flex items-center gap-3 mb-6">
            <Award size={28} className="text-secondary" />
            <h2 className="text-3xl font-bold text-white">Top Rated</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-[450px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {topRated.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
