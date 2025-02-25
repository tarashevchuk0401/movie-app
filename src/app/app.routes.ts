//
// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   {
//     path: 'home',
//     component: LayoutComponent,
//     data: { breadcrumb: { alias: 'home' } },
//     children: [
//       { path: '', redirectTo: 'list', pathMatch: 'full' },
//       {
//         path: 'list',
//         component: MovieComponent,
//         data: { breadcrumb: { alias: 'list' } },
//       },
//       {
//         path: 'movie/:id',
//         component: MoviePageComponent,
//         data: { breadcrumb: { alias: 'movie' } },
//         children: [
//           {
//             path: 'actor',
//             component: ActorPageComponent,
//             data: { breadcrumb: { alias: 'actor' } },
//           },
//           {
//             path: 'company',
//             component: CompanyPageComponent,
//             data: { breadcrumb: { alias: 'company' } },
//           },
//         ],
//       },
//       {
//         path: 'new-movie',
//         component: NewMovieComponent,
//         data: { breadcrumb: { alias: 'new-movie' } },
//       },
//     ],
//   },
// ];


import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
    data: { breadcrumb: { alias: 'home' } },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () => import('./features/movies/pages/movie/movie.component').then(m => m.MovieComponent),
        data: { breadcrumb: { alias: 'list' } },
      },
      {
        path: 'movie/:id',
        loadComponent: () => import('./features/movies/pages/movie-page/movie-page.component').then(m => m.MoviePageComponent),
        data: { breadcrumb: { alias: 'movie' } },
        children: [
          {
            path: 'actor',
            loadComponent: () => import('./features/movies/pages/actor-page/actor-page.component').then(m => m.ActorPageComponent),
            data: { breadcrumb: { alias: 'actor' } },
          },
          {
            path: 'company',
            loadComponent: () => import('./features/movies/pages/company-page/company-page.component').then(m => m.CompanyPageComponent),
            data: { breadcrumb: { alias: 'company' } },
          },
        ],
      },
      {
        path: 'new-movie',
        loadComponent: () => import('./features/movies/pages/new-movie/new-movie.component').then(m => m.NewMovieComponent),
        data: { breadcrumb: { alias: 'new-movie' } },
      },
    ],
  },
];
