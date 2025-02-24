import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { MovieComponent } from './features/movies/pages/movie/movie.component';
import { NewMovieComponent } from './features/movies/pages/new-movie/new-movie.component';
import { MoviePageComponent } from './features/movies/pages/movie-page/movie-page.component';
import {ActorPageComponent} from './features/movies/pages/actor-page/actor-page.component';
import {CompanyPageComponent} from './features/movies/pages/company-page/company-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutComponent,
    data: { breadcrumb: { alias: 'home' } },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: MovieComponent,
        data: { breadcrumb: { alias: 'list' } },
      },
      {
        path: 'movie/:id',
        component: MoviePageComponent,
        data: { breadcrumb: { alias: 'movie' } },
        children: [
          {
            path: 'actor',
            component: ActorPageComponent,
            data: { breadcrumb: { alias: 'actor' } },
          },
          {
            path: 'company',
            component: CompanyPageComponent,
            data: { breadcrumb: { alias: 'company' } },
          },
        ],
      },
      {
        path: 'new-movie',
        component: NewMovieComponent,
        data: { breadcrumb: { alias: 'new-movie' } },
      },
    ],
  },
];
