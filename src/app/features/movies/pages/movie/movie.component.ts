import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { MovieStore } from '../../store/movie.store';

@Component({
  selector: 'app-movie',
  imports: [MovieListComponent, RouterLink, MainButtonComponent],
  templateUrl: './movie.component.html',
  providers: [MovieService],
  styleUrl: './movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  movieStore = inject(MovieStore);

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.movieStore.getList();
  }
}
