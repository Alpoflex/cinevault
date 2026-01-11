'use client';

import { Movie } from '@/types';
import { getImageUrl } from '@/lib/api';
import { formatRating } from '@/lib/utils';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Link href={`/movie/${movie.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="movie-card rounded-lg overflow-hidden cursor-pointer relative group"
            >
                <img
                    src={getImageUrl(movie.poster_path, 'original')}
                    alt={movie.title}
                    className="w-full h-[450px] object-cover transition-all duration-400"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star size={16} className="text-yellow-400" fill="currentColor" />
                            <span className="text-yellow-400 font-semibold">{formatRating(movie.vote_average)}</span>
                        </div>
                        <span className="text-gray-300 text-sm">
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors z-20"
                >
                    <Heart
                        size={20}
                        className={isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}
                    />
                </button>

                <div className="absolute top-3 left-3 rating-badge px-2 py-1 rounded z-20">
                    <span className="text-yellow-400 font-bold text-sm">{formatRating(movie.vote_average)}</span>
                </div>
            </motion.div>
        </Link>
    );
}
