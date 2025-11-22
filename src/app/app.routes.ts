import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.page').then( m => m.MoviesPage)
  },
  {
    path: 'series',
    loadComponent: () => import('./pages/series/series.page').then( m => m.SeriesPage)
  },
  {
    path: 'lists',
    loadComponent: () => import('./pages/lists/lists.page').then( m => m.ListsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
