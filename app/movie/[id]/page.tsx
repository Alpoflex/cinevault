'use client';

import { use, useEffect, useState } from 'react';
import { tmdbApi, getImageUrl, getYoutubeUrl } from '@/lib/api';
import { MovieDetails } from '@/types';
import { formatRuntime, formatRating } from '@/lib/utils';
import { Star, Clock, Calendar, Play, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMovie();
    }, [id]);

    const loadMovie = async () => {
        try {
            const data = await tmdbApi.getMovieDetails(parseInt(id));
            setMovie(data);
        } catch (error) {
            console.error('Error loading movie:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-white">Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-white">Movie not found</div>
            </div>
        );
    }

    const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

    return (
        <main className="min-h-screen">
            {/* Backdrop */}
            <div className="relative h-[80vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
                    <Link
                        href="/"
                        className="absolute top-8 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all backdrop-blur-sm"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
                                <Star size={20} fill="currentColor" />
                                <span className="font-bold text-lg">{formatRating(movie.vote_average)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Clock size={18} />
                                <span>{formatRuntime(movie.runtime)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Calendar size={18} />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-white border border-white/20"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {trailer && (
                            <button className="golden-btn px-8 py-4 rounded-full text-lg flex items-center gap-3">
                                <Play size={24} fill="currentColor" />
                                Watch Trailer
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">Synopsis</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>

                        {/* Cast */}
                        {movie.credits?.cast && movie.credits.cast.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {movie.credits.cast.slice(0, 8).map((person) => (
                                        <div key={person.id} className="text-center">
                                            <img
                                                src={getImageUrl(person.profile_path, 'w200')}
                                                alt={person.name}
                                                className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                                            />
                                            <p className="font-semibold text-white text-sm">{person.name}</p>
                                            <p className="text-gray-400 text-xs">{person.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <img
                            src={getImageUrl(movie.poster_path, 'w500')}
                            alt={movie.title}
                            className="w-full rounded-xl shadow-2xl"
                        />
                    </div>
                </div>

                {/* Trailer */}
                {trailer && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Trailer</h2>
                        <div className="aspect-video rounded-xl overflow-hidden">
                            <iframe
                                src={getYoutubeUrl(trailer.key)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
