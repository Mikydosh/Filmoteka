// Film z API
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

// Detail filmu (rozšířený)
export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
}

// Seriál z API
export interface Series {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
}

// Detail seriálu (rozšířený)
export interface SeriesDetails extends Series {
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  status: string;
  tagline: string;
  genres: Genre[];
  created_by: Creator[];
  networks: Network[];
}

// Pomocné typy
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
}

// Odpověď z API (stránkování)
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}