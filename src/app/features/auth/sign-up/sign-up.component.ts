import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MainButtonComponent } from '../../../shared/components/main-button/main-button.component';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SignUpRequest } from '../../../core/dto/auth/requests/sign-up-request.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    CustomInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MainButtonComponent,
    RouterLink,
  ],
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signUpForm = this.fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log(this.signUpForm.value);
    if (this.signUpForm.invalid) return;
    const request = this.signUpForm.value as SignUpRequest;

    this.authService
      .signUp(request)
      .pipe(
        catchError((error) => {
          alert('Error sign up');
          throw error;
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/log-in']);
      });
  }
}
