# CineVault 🎬

Discover movies the way they were meant to be experienced.

Built this over a weekend because I got tired of Netflix's algorithm. Sometimes you just want to browse movies by genre without being force-fed recommendations.

## What it does

- **Browse 500k+ movies** from TMDB
- **Search** that actually works
- **Filter by genre** - Action, Comedy, Horror, you name it
- **Movie details** with cast, trailers, ratings
- Clean UI inspired by streaming platforms but better

## Tech

Next.js 15 • TypeScript • Tailwind • TMDB API • Framer Motion

## Setup

Get a free API key from [TMDB](https://www.themoviedb.org/settings/api):

```bash
npm install
echo "TMDB_API_KEY=your_key_here" > .env.local
npm run dev
```

That's it. Open localhost:3000 and browse.

## Why I built this

Streaming services hide too much content. TMDB has everything but their website is... not great. Wanted something simple and fast.

---

*Personal project. Not affiliated with TMDB.*
