import {Component, input} from '@angular/core';
import {Movie} from '../../interfaces/movie';

@Component({
  selector: 'app-movie-item',
  imports: [],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  movie = input<Movie>()
}
