import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { MovieComponent } from './features/movies/pages/movie/movie.component';
import { NewMovieComponent } from './features/movies/components/new-movie/new-movie.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MovieComponent },
      { path: 'new', component: NewMovieComponent },
    ],
  },
];
