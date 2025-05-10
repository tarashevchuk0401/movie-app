import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let httpTestingController: HttpTestingController;
  let movieService: MovieService;
  const response = {
    data: [
      {
        id: 1,
        title: 'Movie Title',
        year: 2000,
        category: 'Action',
        rating: 10,
        description: 'Description',
      },
    ],
    total: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    movieService = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // xit('should get all movies', () => {
  //   movieService.getList({ page: 1, pageSize: 1 }).subscribe((listResponse) => {
  //     expect(listResponse).toBeTruthy();
  //     expect(listResponse.total).toBe(1)
  //     expect(listResponse.data.length).toBe(1)
  //     expect(listResponse.data[0].category).toBe('Action');
  //     expect(listResponse.data[0].title).toBe('Movie Title');
  //   });
  //
  //   const req = httpTestingController.expectOne(
  //     'http://localhost:3000/movie/list?page=1&pageSize=1',
  //   );
  //   expect(req.request.method).toBe('GET');
  //   req.flush(response)
  // });

  it('should get movie by id', () => {
    movieService.getItem(1).subscribe((item) => {
      expect(item).toBeTruthy();
      expect(item.id).toBe(1);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/movie/item/1',
    );
    expect(req.request.method).toBe('GET');
    req.flush(response.data[0]);
  });

  it('should create a new movie', () => {
    const newMovie = {
      title: 'New Movie',
      year: 2024,
      category: 'Drama',
      rating: 8,
      description: 'A great movie',
    };

    movieService.createMovie(newMovie).subscribe((res) => {
      expect(res.id).toBe(11);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/movie/item',
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMovie);
    req.flush({ id: 11 });
  });
});
