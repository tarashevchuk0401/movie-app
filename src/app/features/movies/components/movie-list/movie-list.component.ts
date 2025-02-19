import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieItemComponent } from '../movie-item/movie-item.component';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  movieList = input<Movie[]>([]);
}
