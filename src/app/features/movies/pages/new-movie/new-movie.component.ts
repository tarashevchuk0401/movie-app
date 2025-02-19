import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMovieComponent  {
  categories = Categories
  private formBuilder = inject(FormBuilder);

  movieForm = this.formBuilder.group({
    title: ['', Validators.required],
    plot: ['', Validators.required],
    website: ['', Validators.required],
    category: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.movieForm.value);
  }
}
