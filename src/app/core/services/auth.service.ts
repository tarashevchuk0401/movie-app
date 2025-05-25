import {computed, Injectable, signal} from '@angular/core';
import { ApiService } from '../abstracts/api-service';
import { Observable, tap } from 'rxjs';
import { LoginResponseDto } from '../dto/auth/responses/login-response.dto';
import { LogInRequest } from '../dto/auth/requests/log-in-request.dto';
import { SuccessResponse } from '../interfaces/success-response';
import { SignUpRequest } from '../dto/auth/requests/sign-up-request.dto';
import { AuthTokens } from '../types/token.enum';
import { GetMeResponse } from '../dto/auth/responses/get-me-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  user = signal<GetMeResponse | null>(null);
  currentUserId = computed(() => this.user()?.id)

  signIn(data: LogInRequest): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/sign-in`,
      data,
    );
  }

  signUp(data: SignUpRequest): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${this.baseUrl}/auth/sign-up`,
      data,
    );
  }

  getMe(): Observable<GetMeResponse> {
    return this.http
      .get<GetMeResponse>(`${this.baseUrl}/auth/me`)
      .pipe(tap((response) => this.user.set(response)));
  }

  setCookieToken(tokenType: AuthTokens, token: string): void {
    let expires = '';
    const date = new Date();
    if (tokenType === AuthTokens.RefreshToken) {
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else {
      date.setTime(date.getTime() + 60 * 60 * 1000);
    }
    expires = '; expires=' + date.toUTCString();
    document.cookie = tokenType + '=' + (token || '') + expires + '; path=/';
  }

  getCookieToken(tokenType: AuthTokens): string {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    const cookieValue = cookies
      .map((cookie) => {
        return cookie.trim();
      })
      .filter((cookie) => cookie.startsWith(tokenType + '='));

    return cookieValue[0]?.substring(tokenType.length + 1) || '';
  }
}
