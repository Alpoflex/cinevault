import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const endpoint = path.join('/');
    const searchParams = request.nextUrl.searchParams;

    // Add API key server-side
    searchParams.set('api_key', API_KEY || '');

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/${endpoint}`, {
            params: Object.fromEntries(searchParams),
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('TMDB API Proxy Error:', error.message);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: error.response?.status || 500 }
        );
    }
}
