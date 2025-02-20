import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { CustomSelectorComponent } from '../../../../shared/components/custom-selector/custom-selector.component';
import { Categories } from '../../interfaces/categories';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new-movie',
  imports: [
    CustomInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MainButtonComponent,
    CustomSelectorComponent,
  ],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMovieComponent {
  private formBuilder = inject(FormBuilder);
  categories = Categories;
  moviesService = inject(MovieService);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  movieForm = this.formBuilder.nonNullable.group({
    title: ['Star wars', Validators.required],
    description: ['Star wars film. Star wars film', Validators.required],
    category: ['', Validators.required],
  });

  onSubmit() {
    const movie: Omit<Movie, 'id'> = {
      year: Math.floor(Math.random() * (2024 - 1999 + 1)) + 1999,
      rating: Math.floor(Math.random() * 10) + 1,
      ...this.movieForm.getRawValue(),
    };

    this.moviesService
      .createMovie(movie)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.movieForm.reset();
        this.cdr.markForCheck();
      });
  }
}
