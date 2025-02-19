import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {MovieListComponent} from './features/movie-list/movie-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: MovieListComponent }],
  },
];
