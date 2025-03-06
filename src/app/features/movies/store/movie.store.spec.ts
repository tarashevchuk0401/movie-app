// import { MovieStore} from './movie.store';
// import {TestBed} from '@angular/core/testing';
// import {MovieService} from '../services/movie.service';
// import {ListParams} from '../../../core/interfaces/list-params';
// import {of} from 'rxjs';
//
// describe('MovieStore', () => {
//   let movieStore: any;
//   let movieServiceSpy: jasmine.SpyObj<MovieService>;
//
//   const mockMovieList = [
//     { id: 1, title: 'Movie 1', year: 2000, category: 'Action', rating: 9, description: 'Test Movie 1' },
//     { id: 2, title: 'Movie 2', year: 2005, category: 'Drama', rating: 8, description: 'Test Movie 2' }
//   ];
//
//   const mockMovie = { id: 1, title: 'Movie 1', year: 2000, category: 'Action', rating: 9, description: 'Test Movie 1' };
//
//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('MovieService', ['getList', 'getItem', 'deleteMovie']);
//
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: MovieService, useValue: spy }
//       ]
//     });
//
//     movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
//     movieStore = TestBed.inject(MovieStore);
//   });
//
//   it('should initialize with default state', () => {
//     expect(movieStore.movieList()).toEqual([
//       {
//         id: 1,
//         title: 'Movie Details',
//         year: 2000,
//         category: 'Action',
//         rating: 10,
//         description: 'Description',
//       }
//     ]);
//     expect(movieStore.movie()).toEqual({});
//     expect(movieStore.total()).toBe(0);
//   });
//
//   it('should fetch movie list and update state', () => {
//     const params: ListParams = { page: 1, pageSize: 2 };
//     movieServiceSpy.getList.and.returnValue(of({ data: mockMovieList, total: 2 }));
//
//     movieStore.getList(params);
//
//     expect(movieServiceSpy.getList).toHaveBeenCalledWith(params);
//     expect(movieStore.movieList()).toEqual(mockMovieList);
//     expect(movieStore.total()).toBe(2);
//   });
//
//   it('should fetch a single movie by ID and update state', () => {
//     movieServiceSpy.getItem.and.returnValue(of(mockMovie));
//
//     movieStore.getItem(1);
//
//     expect(movieServiceSpy.getItem).toHaveBeenCalledWith(1);
//     expect(movieStore.movie()).toEqual(mockMovie);
//   });
//
//   it('should delete a movie and update the movie list', () => {
//     movieServiceSpy.getList.and.returnValue(of({ data: mockMovieList, total: 2 }));
//     movieServiceSpy.deleteMovie.and.returnValue(of({ id: 1 }));
//
//     movieStore.getList({ page: 1, pageSize: 2 });
//     movieStore.deleteItem(1);
//
//     expect(movieServiceSpy.deleteMovie).toHaveBeenCalledWith(1);
//     expect(movieStore.movieList().length).toBe(1);
//     expect(movieStore.movieList()).toEqual([mockMovieList[1]]);
//   });
//
//
// })
