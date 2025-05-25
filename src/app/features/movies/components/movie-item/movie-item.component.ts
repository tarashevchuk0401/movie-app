import { Component, inject, input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-movie-item',
  imports: [
    MainButtonComponent,
    RouterLink,
    MatIcon,
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent implements OnInit {
  movie = input.required<Movie>();
  movieService = inject(MovieService);
  fb = inject(FormBuilder);

  isEditing = false;
  movieForm: FormGroup;

  constructor() {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      year: [
        null,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      rating: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      actors: [''],
      category: [''],
    });
  }

  ngOnInit() {
    // Set initial form values
    this.movieForm.patchValue({
      category: this.movie().category,
    });
  }

  deleteItem(id: number) {
    this.movieService.deleteMovie(id).subscribe();
  }

  startEditing() {
    this.movieForm.patchValue({
      title: this.movie().title,
      description: this.movie().description,
      year: this.movie().year,
      rating: this.movie().rating,
      actors: this.movie().actors?.join(', ') || '',
      category: this.movie().category,
    });
    this.isEditing = true;
  }

  saveChanges() {
    if (this.movieForm.valid) {
      const formValue = this.movieForm.value;
      const updatedMovie = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        year: formValue.year,
        rating: formValue.rating,
        actors: formValue.actors
          .split(',')
          .map((actor: string) => actor.trim())
          .filter((actor: string) => actor.length > 0),
      };

      this.updateItem(this.movie().id, updatedMovie);
      this.isEditing = false;
    }
  }

  updateItem(id: number, movie: Omit<Movie, 'id'>) {
    this.movieService.updateMovie(id, movie).subscribe();
  }

  get formControls() {
    return this.movieForm.controls;
  }
}
