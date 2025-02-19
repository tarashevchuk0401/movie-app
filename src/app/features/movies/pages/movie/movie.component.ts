import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { ApiService } from '../../../../core/abstracts/api-service';
import { Movie } from '../../interfaces/movie';
import {RouterLink} from '@angular/router';
import {MainButtonComponent} from '../../../../shared/components/main-button/main-button.component';

@Component({
  selector: 'app-movie',
  imports: [MovieListComponent, RouterLink, MainButtonComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent extends ApiService implements OnInit {
  movieList = signal<Movie[]>([])

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.http
      .get<Movie[]>(`${this.baseUrl}/movies`)
      .subscribe((movies: Movie[]) => this.movieList.set(movies));
  }
}
