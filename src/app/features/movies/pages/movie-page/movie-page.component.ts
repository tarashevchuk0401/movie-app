import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-page',
  imports: [RouterLink, RouterOutlet, MainButtonComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);
  activatedRoute = inject(ActivatedRoute);
  moviesService = inject(MovieService);
  movieId = this.activatedRoute.snapshot.paramMap.get('id');
  movie = toSignal(this.moviesService.getItem(Number(this.movieId)));

  ngOnInit() {
    this.breadcrumbService.set('@movie', 'Movie');
  }
}
