import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner
} from '@ionic/angular/standalone';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/media.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner
  ],
})
export class MoviesPage implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  isLoading = true;

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit() {
    this.loadAllMovies();
  }

  loadAllMovies() {
    this.isLoading = true;
    let loadedCount = 0;
    const totalToLoad = 3;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === totalToLoad) {
        this.isLoading = false;
      }
    };

    // Populární (4 filmy)
    this.tmdbService.getPopularMovies().subscribe({
      next: (response) => {
        this.popularMovies = response.results;
        checkLoaded();
      },
      error: () => checkLoaded()
    });

    // Nejlépe hodnocené (20 filmů)
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.topRatedMovies = response.results;
        checkLoaded();
      },
      error: () => checkLoaded()
    });

    // Již brzy (20 filmů)
    this.tmdbService.getUpcomingMovies().subscribe({
      next: (response) => {
        this.upcomingMovies = response.results;
        checkLoaded();
      },
      error: () => checkLoaded()
    });
  }

  getPosterUrl(path: string | null): string {
    return this.tmdbService.getPosterUrl(path, 'w342');
  }

  getRatingPercent(rating: number): number {
    return Math.round(rating * 10);
  }

  getCoverGradient(rating: number): string {
    const percent = this.getRatingPercent(rating);
    const angle = (percent / 100) * 360;
    
    return `conic-gradient(from 0deg, transparent 0deg, transparent ${angle}deg, var(--ion-card-background, #fff) ${angle}deg, var(--ion-card-background, #fff) 360deg)`;
  }

  openMovieDetail(movieId: number) {
  this.router.navigate(['/movie', movieId]);
}
}