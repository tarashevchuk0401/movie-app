import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieStore } from '../../store/movie.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  imports: [RouterLink, RouterOutlet, MainButtonComponent, JsonPipe],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);
  activatedRoute = inject(ActivatedRoute);
  moviesStore = inject(MovieStore);

  ngOnInit() {
    this.breadcrumbService.set('@movie', 'Movie');
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.moviesStore.getItem(Number(movieId));
  }
}
