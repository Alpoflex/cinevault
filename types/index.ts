export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids: number[];
    genres?: Genre[];
    runtime?: number;
    popularity: number;
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: Genre[];
    credits: {
        cast: Cast[];
    };
    videos: {
        results: Video[];
    };
}

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface ApiResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
