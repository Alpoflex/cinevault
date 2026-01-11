import axios from 'axios';
import { Movie, MovieDetails, Genre, ApiResponse } from '@/types';

// TMDB API - Free to use, just need API key
const API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const tmdbApi = {
    // Get trending movies
    getTrending: async (): Promise<Movie[]> => {
        const { data } = await api.get<ApiResponse<Movie>>('/trending/movie/week');
        return data.results;
    },

    // Get popular movies
    getPopular: async (page = 1): Promise<ApiResponse<Movie>> => {
        const { data } = await api.get<ApiResponse<Movie>>('/movie/popular', {
            params: { page },
        });
        return data;
    },

    // Get top rated movies
    getTopRated: async (): Promise<Movie[]> => {
        const { data } = await api.get<ApiResponse<Movie>>('/movie/top_rated');
        return data.results;
    },

    // Search movies
    searchMovies: async (query: string): Promise<Movie[]> => {
        const { data } = await api.get<ApiResponse<Movie>>('/search/movie', {
            params: { query },
        });
        return data.results;
    },

    // Get movie details
    getMovieDetails: async (id: number): Promise<MovieDetails> => {
        const { data } = await api.get<MovieDetails>(`/movie/${id}`, {
            params: {
                append_to_response: 'credits,videos',
            },
        });
        return data;
    },

    // Get genres
    getGenres: async (): Promise<Genre[]> => {
        const { data } = await api.get<{ genres: Genre[] }>('/genre/movie/list');
        return data.genres;
    },

    // Discover by genre
    discoverByGenre: async (genreId: number): Promise<Movie[]> => {
        const { data } = await api.get<ApiResponse<Movie>>('/discover/movie', {
            params: {
                with_genres: genreId,
                sort_by: 'popularity.desc',
            },
        });
        return data.results;
    },
};

// Helper functions
export const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder-movie.jpg';
    return `${IMAGE_BASE}/${size}${path}`;
};

export const getYoutubeUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}`;
};
