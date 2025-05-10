import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthTokens } from '../types/token.enum';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const addToken = (req: HttpRequest<unknown>): HttpRequest<unknown> => {
    const token = authService.getCookieToken(AuthTokens.AccessToken);

    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return req;
  };

  //TODO : Define getRefresh endpoint and handle refreshing here

  // const handleUnauthorizedError = (
  //   req: HttpRequest<unknown>,
  //   nextFn: HttpHandlerFn
  // ): Observable<HttpEvent<unknown>> => {
  //   return userStore.getRefreshToken().pipe(
  //     switchMap(tokens => {
  //       const newRequest = req.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${tokens.access_token}`,
  //         },
  //       });
  //
  //       return nextFn(newRequest);
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       router.navigate(['/auth/sign-in']);
  //       throw error;
  //     })
  //   );
  // };

  const authReq = addToken(request);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !request.url.includes('/jwt/refresh')) {
        // return handleUnauthorizedError(request, next);
        router.navigate(['/sign-in']);
      }
      return throwError(() => error);
    }),
  );
};
