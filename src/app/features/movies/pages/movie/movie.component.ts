import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie',
  imports: [
    MovieListComponent,
    RouterLink,
    MainButtonComponent,
    MatPaginatorModule,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  movieService = inject(MovieService);
  breadcrumbService = inject(BreadcrumbService);
  page = 1;
  pageSize = 10;
  movieList = signal<Movie[]>([]);
  total = signal(0);

  ngOnInit() {
    this.getList();
    this.breadcrumbService.set('@list', 'Movie list');
    this.movieService.movies$.subscribe((data) => {
      this.movieList.set(data.data);
      this.total.set(data.total);
    });
  }

  getList() {
    this.movieService.getList({ page: this.page, pageSize: this.pageSize });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.movieService.getList({ page: this.page, pageSize: this.pageSize });
  }
}
