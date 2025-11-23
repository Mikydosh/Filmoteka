import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner
} from '@ionic/angular/standalone';
import { TmdbService } from '../../services/tmdb.service';
import { Series } from '../../models/media.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
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
export class SeriesPage implements OnInit {
  popularSeries: Series[] = [];
  topRatedSeries: Series[] = [];
  isLoading = true;

  constructor(private tmdbService: TmdbService, private router : Router) {}

  ngOnInit() {
    this.loadAllSeries();
  }

  loadAllSeries() {
    this.isLoading = true;
    let loadedCount = 0;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        this.isLoading = false;
      }
    };

    this.tmdbService.getPopularSeries().subscribe({
      next: (response) => {
        this.popularSeries = response.results;
        checkLoaded();
      },
      error: () => checkLoaded()
    });

    this.tmdbService.getTopRatedSeries().subscribe({
      next: (response) => {
        this.topRatedSeries = response.results;
        checkLoaded();
      },
      error: () => checkLoaded()
    });
  }

  openSeriesDetail(seriesId: number) {
    this.router.navigate(['/series', seriesId]);
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
}