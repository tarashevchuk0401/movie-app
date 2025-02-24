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
import {BreadcrumbService} from 'xng-breadcrumb';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-movie',
  imports: [MovieListComponent, RouterLink, MainButtonComponent, MatPaginatorModule],
  templateUrl: './movie.component.html',
  providers: [MovieService],
  styleUrl: './movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  movieStore = inject(MovieStore);
  breadcrumbService = inject(BreadcrumbService);
  page = 1
  pageSize = 10
  length = this.movieStore.total();

  ngOnInit() {
    this.getList();
    this.breadcrumbService.set('@list', 'Movie list')
  }

  getList() {
    this.movieStore.getList({page: this.page,pageSize: this.pageSize});
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1
    this.pageSize = event.pageSize;
    this.movieStore.getList({page: this.page,pageSize: this.pageSize});
  }
}
