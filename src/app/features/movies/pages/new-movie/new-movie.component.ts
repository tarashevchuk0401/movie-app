import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
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
import { UniqueTitleValidator } from '../../../../core/validators/unique-title.validator';

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
export class NewMovieComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  categories = Categories;
  moviesService = inject(MovieService);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  uniqueTitleValidator = inject(UniqueTitleValidator);

  movieForm = this.formBuilder.nonNullable.group({
    title: this.formBuilder.nonNullable.control('Star wars', {
      asyncValidators: [
        this.uniqueTitleValidator.titleValidator(this.moviesService),
      ],
      updateOn: 'blur',
    }),
    description: ['Some description about your movie', Validators.required],
    category: ['', Validators.required],
    actors: this.formBuilder.array([]),
  });

  get actors(): FormArray {
    return this.movieForm.get('actors') as FormArray;
  }

  newSkill(): FormGroup {
    return this.formBuilder.group({
      actor: ['', Validators.required],
    });
  }

  addActor() {
    this.actors.push(this.newSkill());
  }

  removeActor(i: number) {
    this.actors.removeAt(i);
  }

  ngOnInit() {
    this.movieForm.valueChanges.subscribe(() => {
      console.log(this.movieForm);
    });
  }

  onSubmit() {
    const movie: Omit<Movie, 'id' | 'actors'> = {
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
