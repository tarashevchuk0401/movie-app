import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthTokens } from '../types/token.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    const token = this.authService.getCookieToken(AuthTokens.AccessToken);

    if (token.length > 1) {
      return true;
    } else {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }
  }
}
