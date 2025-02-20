import { Component, input, output } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';

@Component({
  selector: 'app-movie-item',
  imports: [MainButtonComponent],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  movie = input.required<Movie>();
  deleteItem = output<number>();
}
