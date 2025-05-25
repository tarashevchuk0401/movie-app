import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { MainButtonComponent } from '../../../shared/components/main-button/main-button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LogInRequest } from '../../../core/dto/auth/requests/log-in-request.dto';
import { LoginResponseDto } from '../../../core/dto/auth/responses/login-response.dto';
import { catchError } from 'rxjs';
import { AuthTokens } from '../../../core/types/token.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    MainButtonComponent,
    RouterLink,
  ],
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log(this.signInForm.value);
    if (this.signInForm.invalid) return;
    const request = this.signInForm.value as LogInRequest;

    this.authService
      .signIn(request)
      .pipe(
        catchError((error) => {
          alert('Error log in');
          throw error;
        }),
      )
      .subscribe((response: LoginResponseDto) => {
        this.authService.setCookieToken(
          AuthTokens.RefreshToken,
          response.refreshToken,
        );
        this.authService.setCookieToken(AuthTokens.AccessToken, response.token);

        this.router.navigate(['/home']);
      });
  }
}
