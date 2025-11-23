import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieDetails, Series, SeriesDetails, TMDBResponse } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly API_KEY = '0d147ba1d4464d1ceec758e2a54e450e';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
  private readonly LANGUAGE = 'cs-CZ';

  constructor(private http: HttpClient) {}

  // ==================== FILMY ====================

  // Získat populární filmy
  getPopularMovies(page: number = 1): Observable<TMDBResponse<Movie>> {
    return this.http.get<TMDBResponse<Movie>>(
      `${this.BASE_URL}/movie/popular`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          page: page.toString()
        }
      }
    );
  }

  // Nejlépe hodnocené filmy
getTopRatedMovies(page: number = 1): Observable<TMDBResponse<Movie>> {
  return this.http.get<TMDBResponse<Movie>>(
    `${this.BASE_URL}/movie/top_rated`,
    {
      params: {
        api_key: this.API_KEY,
        language: this.LANGUAGE,
        page: page.toString()
      }
    }
  );
}

  // Připravované filmy
getUpcomingMovies(page: number = 1): Observable<TMDBResponse<Movie>> {
  return this.http.get<TMDBResponse<Movie>>(
    `${this.BASE_URL}/movie/upcoming`,
    {
      params: {
        api_key: this.API_KEY,
        language: this.LANGUAGE,
        page: page.toString()
      }
    }
  );
}

  // Vyhledat filmy
  searchMovies(query: string, page: number = 1): Observable<TMDBResponse<Movie>> {
    return this.http.get<TMDBResponse<Movie>>(
      `${this.BASE_URL}/search/movie`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          query: query,
          page: page.toString()
        }
      }
    );
  }

  // Získat detail filmu
  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.BASE_URL}/movie/${movieId}`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          append_to_response: 'credits'
        }
      }
    );
  }

  // ==================== SERIÁLY ====================

  // Získat populární seriály
  getPopularSeries(page: number = 1): Observable<TMDBResponse<Series>> {
    return this.http.get<TMDBResponse<Series>>(
      `${this.BASE_URL}/tv/popular`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          page: page.toString()
        }
      }
    );
  }

  // Nejlépe hodnocené seriály
getTopRatedSeries(page: number = 1): Observable<TMDBResponse<Series>> {
  return this.http.get<TMDBResponse<Series>>(
    `${this.BASE_URL}/tv/top_rated`,
    {
      params: {
        api_key: this.API_KEY,
        language: this.LANGUAGE,
        page: page.toString()
      }
    }
  );
}

  // Vyhledat seriály
  searchSeries(query: string, page: number = 1): Observable<TMDBResponse<Series>> {
    return this.http.get<TMDBResponse<Series>>(
      `${this.BASE_URL}/search/tv`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          query: query,
          page: page.toString()
        }
      }
    );
  }

  // Získat detail seriálu
  getSeriesDetails(seriesId: number): Observable<SeriesDetails> {
    return this.http.get<SeriesDetails>(
      `${this.BASE_URL}/tv/${seriesId}`,
      {
        params: {
          api_key: this.API_KEY,
          language: this.LANGUAGE,
          append_to_response: 'credits'
        }
      }
    );
  }

  // ==================== OBRÁZKY ====================

  // Získat URL plakátu
  // Velikosti: w92, w154, w185, w342, w500, w780, original
  getPosterUrl(path: string | null, size: string = 'original'): string {
    if (!path) {
      return 'assets/no-poster.png'; // Placeholder obrázek
    }
    return `${this.IMAGE_BASE_URL}/${size}${path}`;
  }

  // Získat URL pozadí
  // Velikosti: w300, w780, w1280, original
  getBackdropUrl(path: string | null, size: string = 'original'): string {
    if (!path) {
      return '';
    }
    return `${this.IMAGE_BASE_URL}/${size}${path}`;
  }
}