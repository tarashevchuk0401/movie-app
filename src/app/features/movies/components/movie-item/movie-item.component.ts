import {Component, inject, input} from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import {MovieStore} from '../../store/movie.store';
import {MovieService} from '../../services/movie.service';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-movie-item',
  imports: [MainButtonComponent, RouterLink, MatIcon],
  templateUrl: './movie-item.component.html',
  providers: [MovieService],
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  movie = input.required<Movie>();
  movieStore = inject(MovieStore);

  deleteItem(id: number) {
    this.movieStore.deleteItem(id)
  }
}
