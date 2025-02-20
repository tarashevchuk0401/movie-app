import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../interfaces/movie';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie',
  imports: [MovieListComponent, RouterLink, MainButtonComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  movieList = signal<Movie[]>([]);
  moviesService = inject(MovieService);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.moviesService
      .getList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => this.movieList.set(response.data));
  }

  deleteItem(event: number) {
    this.moviesService
      .deleteMovie(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.movieList.update((movieList) =>
          movieList.filter((movie) => movie.id !== event),
        );
      });
  }
}
