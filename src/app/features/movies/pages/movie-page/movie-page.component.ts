import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

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
  movie = signal<Movie | null>(null);

  ngOnInit() {
    this.breadcrumbService.set('@movie', 'Movie');
    this.getMovie();
  }

  getMovie(): void {
    this.moviesService.getItem(Number(this.movieId)).subscribe((movie) => {
      this.movie.set(movie);
    });
  }
}
