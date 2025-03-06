import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/abstracts/api-service';
import { ListResponse } from '../../../core/interfaces/list-response';
import { Movie } from '../interfaces/movie';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { SuccessResponse } from '../../../core/interfaces/success-response';
import { ListParams } from '../../../core/interfaces/list-params';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends ApiService {
  listResponse = new BehaviorSubject<ListResponse<Movie>>({
    data: [],
    total: 0,
  });

  get movies$(): Observable<ListResponse<Movie>> {
    return this.listResponse.asObservable();
  }

  getList(params: ListParams) {
    const { page, pageSize } = params;
    this.http
      .get<ListResponse<Movie>>(`${this.baseUrl}/movie/list`, {
        params: { page, pageSize },
      })
      .pipe(first())
      .subscribe((data) => {
        this.listResponse.next(data);
      });
  }

  getItem(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/item/${id}`);
  }

  createMovie(movie: Omit<Movie, 'id'>): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.baseUrl}/movie/item`, movie);
  }

  deleteMovie(id: number): Observable<SuccessResponse> {
    return this.http
      .delete<SuccessResponse>(`${this.baseUrl}/movie/item/${id}`)
      .pipe(
        first(),
        tap(() => {
          const updatedMovies = this.listResponse
            .getValue()
            .data.filter((movie) => movie.id !== id);
          this.listResponse.next({
            data: updatedMovies,
            total: updatedMovies.length,
          });
        }),
      );
  }

  isTitleUnique(title: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/movie/check-title/${title}`);
  }
}
