import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Movie } from '../interfaces/movie';
import { computed, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {first, tap} from 'rxjs';

export const MovieStore = signalStore(
  { providedIn: 'root' },
  withState({
    movieList: [] as Movie[],
    movie: {} as Movie,
  }),
  withComputed(({ movieList }) => ({
    movieCount: computed(() => movieList().length),
  })),
  withMethods((store, movieService = inject(MovieService)) => ({
    getList: () => {
      movieService
        .getList()
        .pipe(first())
        .subscribe((d) => {
          patchState(store, () => {
            return { movieList: [...d.data] };
          });
        });
    },

    getItem: (id: number) => {
      movieService
        .getItem(id)
        .pipe(first())
        .subscribe(movie => {
          patchState(store, () => {
            return { movie };
          });
        });
    },

    deleteItem: (id: number) => {
      movieService
        .deleteMovie(id)
        .pipe(first())
        .subscribe(() => {
          patchState(store, (state) => {
            return {
              movieList: [
                ...state.movieList.filter((movie) => movie.id !== id),
              ],
            };
          });
        });
    },
  })),
  withHooks({
    onInit: (store) => console.log('Store initialized', store),
    onDestroy: (store) => console.log('Store destroyed', store),
  }),
);
