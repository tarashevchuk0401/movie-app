import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItemComponent, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  movieList = input<Movie[]>([]);
}
