import {Component, inject, input} from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import {MovieService} from '../../services/movie.service';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movie-item',
  imports: [MainButtonComponent, RouterLink, MatIcon, FormsModule],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  movie = input.required<Movie>();
  movieService = inject(MovieService);

  deleteItem(id: number) {
    this.movieService.deleteMovie(id).subscribe()
  }
}
