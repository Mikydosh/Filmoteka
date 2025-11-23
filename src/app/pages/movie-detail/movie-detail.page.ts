import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';
import { TmdbService } from '../../services/tmdb.service';
import { MovieDetails, Crew } from '../../models/media.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonChip,
    IonLabel
  ],
})
export class MovieDetailPage implements OnInit {
  movie: MovieDetails | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovie(parseInt(movieId));
    }
  }

  loadMovie(id: number) {
    this.isLoading = true;
    this.tmdbService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movie:', error);
        this.isLoading = false;
      }
    });
  }

  getPosterUrl(path: string | null): string {
    return this.tmdbService.getPosterUrl(path, 'w500');
  }

  getBackdropUrl(path: string | null): string {
    return this.tmdbService.getBackdropUrl(path, 'w1280');
  }

  getYear(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear().toString();
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  }

  getRatingPercent(rating: number): number {
    return Math.round(rating * 10);
  }

  getCoverGradient(rating: number): string {
    const percent = this.getRatingPercent(rating);
    const angle = (percent / 100) * 360;
    return `conic-gradient(from 0deg, transparent 0deg, transparent ${angle}deg, var(--ion-card-background, #fff) ${angle}deg, var(--ion-card-background, #fff) 360deg)`;
  }

  getProductionCompanies(): string {
    if (!this.movie?.production_companies) return '';
    return this.movie.production_companies.map(c => c.name).join(', ');
  }

  getProfileUrl(path: string | null): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/w185${path}`;
}

  getDirector(): Crew | null{
    if(!this.movie?.credits?.crew) return null;

    return this.movie.credits.crew.find(person => person.job === 'Director') || null;
  }

  getComposer(): Crew | null {
  if (!this.movie?.credits?.crew) return null;

  return this.movie.credits.crew.find(person => person.job === 'Original Music Composer') || null;
}

}