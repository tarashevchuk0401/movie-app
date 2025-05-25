import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    data: { breadcrumb: { alias: 'home' } },
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/chat.component').then((m) => m.ChatComponent),
        data: { breadcrumb: { alias: 'chat' } },
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './features/chat/pages/chat-list/chat-list.component'
              ).then((m) => m.ChatListComponent),
            data: { breadcrumb: { alias: 'chat' } },
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './features/chat/pages/create-chat/create-chat.component'
              ).then((m) => m.CreateChatComponent),
            data: { breadcrumb: { alias: 'create' } },
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import(
                './features/chat/pages/chat-details/chat-details.component'
              ).then((m) => m.ChatDetailsComponent),
            data: { breadcrumb: { alias: 'chat-details' } },
          },
        ],
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./features/movies/pages/movie/movie.component').then(
            (m) => m.MovieComponent,
          ),
        data: { breadcrumb: { alias: 'list' } },
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import(
            './features/movies/pages/movie-page/movie-page.component'
          ).then((m) => m.MoviePageComponent),
        data: { breadcrumb: { alias: 'movie' } },
        children: [
          {
            path: 'actor',
            loadComponent: () =>
              import(
                './features/movies/pages/actor-page/actor-page.component'
              ).then((m) => m.ActorPageComponent),
            data: { breadcrumb: { alias: 'actor' } },
          },
          {
            path: 'company',
            loadComponent: () =>
              import(
                './features/movies/pages/company-page/company-page.component'
              ).then((m) => m.CompanyPageComponent),
            data: { breadcrumb: { alias: 'company' } },
          },
        ],
      },
      {
        path: 'new-movie',
        loadComponent: () =>
          import('./features/movies/pages/new-movie/new-movie.component').then(
            (m) => m.NewMovieComponent,
          ),
        data: { breadcrumb: { alias: 'new-movie' } },
      },
    ],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./features/auth/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./features/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
