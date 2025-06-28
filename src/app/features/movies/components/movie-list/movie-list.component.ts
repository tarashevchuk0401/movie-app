import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItemComponent, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('600ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MovieListComponent {
  movieList = input<Movie[]>([]);
}
