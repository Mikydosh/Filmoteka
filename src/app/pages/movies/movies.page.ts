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
import { IonSearchbar } from '@ionic/angular/standalone';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
    IonSpinner,
    IonSearchbar
  ],
})
export class MoviesPage implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  isLoading = true;

  //pro search
  searchResults: Movie[] = [];
  isSearching = false;
  showSearchResults = false;
  private searchSubject = new Subject<string>();

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit() {
    this.loadAllMovies();

    // debounce pro search
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(searchTerm => {
      if(searchTerm.trim().length > 0){
        this.performSearch(searchTerm);
      }else{
        this.clearSearch();
      }
    });
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

// HLEDANI
onSearchChange(event: any){
  const query = event.target.value;
  this.searchSubject.next(query);
}

performSearch(query: string) {
  this.isSearching = true;
  this.showSearchResults = true;
  
  this.tmdbService.searchMovies(query).subscribe({
    next: (response) => {
      this.searchResults = response.results;
      this.isSearching = false;
    },
    error: () => {
      this.isSearching = false;
    }
  });
}

clearSearch() {
  this.searchResults = [];
  this.showSearchResults = false;
  this.isSearching = false;
}

onSearchCancel() {
  this.clearSearch();
}

}