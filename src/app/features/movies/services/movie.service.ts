import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/abstracts/api-service';
import { ListResponse } from '../../../core/interfaces/list-response';
import { Movie } from '../interfaces/movie';
import { Observable} from 'rxjs';
import { SuccessResponse } from '../../../core/interfaces/success-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends ApiService {
  getList(): Observable<ListResponse<Movie>> {
    return this.http.get<ListResponse<Movie>>(`${this.baseUrl}/movie/list`);
  }

  createMovie(movie: Omit<Movie, 'id'>): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.baseUrl}/movie/item`, movie);
  }

  deleteMovie(id: number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(
      `${this.baseUrl}/movie/item/${id}`,
    );
  }

  isTitleUnique(title: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/movie/check-title/${title}`);
  }
}
