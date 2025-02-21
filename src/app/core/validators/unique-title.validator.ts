import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { MovieService } from '../../features/movies/services/movie.service';
import { delay, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator {
  titleValidator(movieService: MovieService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        delay(800),
        switchMap((title) => {
          return movieService.isTitleUnique(title).pipe(
            map((isUnique) => {
              return isUnique ? null : { titleNotUnique: true };
            }),
          );
        }),
      );
    };
  }
}
