import { MovieComponent } from './movie.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieService } from '../../services/movie.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DebugElement } from '@angular/core';
import { routes } from '../../../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('MovieComponent', () => {
  let fixture: ComponentFixture<MovieComponent>;
  let component: MovieComponent;
  let el: DebugElement;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let breadcrumbServiceSpy: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(waitForAsync(() => {
    movieServiceSpy = jasmine.createSpyObj<MovieService>(
      'MovieService',
      ['getList'],
      {
        movies$: of({
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
        }),
      },
    );
    breadcrumbServiceSpy = jasmine.createSpyObj('BreadcrumbService', ['set']);

    TestBed.configureTestingModule({
      imports: [
        MovieComponent,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        MatPaginatorModule,
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: BreadcrumbService, useValue: breadcrumbServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(component.page).toBe(1);
    expect(component.pageSize).toBe(10);
  });

  it('should set breadcrumb on init', () => {
    spyOn(component, 'getList');

    fixture.detectChanges();

    expect(breadcrumbServiceSpy.set).toHaveBeenCalledWith(
      '@list',
      'Movie list',
    );
    expect(component.getList).toHaveBeenCalled();
  });

  it('should render no movies', () => {
    Object.defineProperty(movieServiceSpy, 'movies$', {
      get: () => of({ data: [], total: 7 }),
    });

    fixture.detectChanges();

    expect(component.movieList().length).toBe(0);
    expect(component.total()).toBe(7);

    const emptyMessage = el.queryAll(By.css('.empty'));
    expect(emptyMessage.length).toBe(1);
  });

  it('should render 1 movie', () => {
    movieServiceSpy.movies$.subscribe();

    fixture.detectChanges();

    expect(component.movieList().length).toBe(1);
    expect(component.total()).toBe(1);
  });

  it('should get list', () => {
    spyOn(component, 'getList');
    fixture.detectChanges();
    expect(component.getList).toHaveBeenCalled();
  });

  it('should update pagination when handlePageEvent is triggered', () => {
    spyOn(component, 'getList');

    const mockEvent = { pageIndex: 2, pageSize: 5 } as PageEvent;
    component.handlePageEvent(mockEvent);
    fixture.detectChanges();

    expect(component.page).toBe(3);
    expect(component.pageSize).toBe(5);
    expect(component.getList).toHaveBeenCalled();
  });
});
