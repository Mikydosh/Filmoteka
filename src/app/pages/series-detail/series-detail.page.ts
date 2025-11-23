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
import { SeriesDetails, Crew } from '../../models/media.model';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.page.html',
  styleUrls: ['./series-detail.page.scss'],
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
export class SeriesDetailPage implements OnInit {
  series: SeriesDetails | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    const seriesId = this.route.snapshot.paramMap.get('id');
    if (seriesId) {
      this.loadSeries(parseInt(seriesId));
    }
  }

  loadSeries(id: number) {
    this.isLoading = true;
    this.tmdbService.getSeriesDetails(id).subscribe({
      next: (series) => {
        this.series = series;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading series:', error);
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

  getRatingPercent(rating: number): number {
    return Math.round(rating * 10);
  }

  getCoverGradient(rating: number): string {
    const percent = this.getRatingPercent(rating);
    const angle = (percent / 100) * 360;

    return `conic-gradient(from 0deg, transparent 0deg, transparent ${angle}deg, var(--ion-card-background, #fff) ${angle}deg, var(--ion-card-background, #fff) 360deg)`;
  }

  getCreators(): string {
    if (!this.series?.created_by) return '';

    return this.series.created_by.map(c => c.name).join(', ');
  }

  getNetworks(): string {
    if (!this.series?.networks) return '';

    return this.series.networks.map(n => n.name).join(', ');
  }

  getProfileUrl(path: string | null): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/w185${path}`;
}

  getDirector(): Crew | null {
    if (!this.series?.credits?.crew) return null;
  
    return this.series.credits.crew.find(person => person.job === 'Director') || null;
  }

  getComposer(): Crew | null {
    if (!this.series?.credits?.crew) return null;

    return this.series.credits.crew.find(person => person.job === 'Original Music Composer') || null;
  }

}