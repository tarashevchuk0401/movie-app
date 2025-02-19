import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import {MainButtonComponent} from '../../../../shared/components/main-button/main-button.component';

@Component({
  selector: 'app-new-movie',
  imports: [CustomInputComponent, FormsModule, ReactiveFormsModule, MainButtonComponent],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMovieComponent {
  private formBuilder = inject(FormBuilder);

  movieForm = this.formBuilder.group({
    title: ['', Validators.required],
    plot: ['', Validators.required],
    website: ['', Validators.required],
  });

  onSubmit(){
    console.log(this.movieForm.value)
  }
}
