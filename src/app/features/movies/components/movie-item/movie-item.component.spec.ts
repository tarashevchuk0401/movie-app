import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MovieItemComponent } from './movie-item.component';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from '../../interfaces/movie';
import { By } from '@angular/platform-browser';
import {MovieService} from '../../services/movie.service';
import {of} from 'rxjs';''

fdescribe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['deleteMovie']);
    await TestBed.configureTestingModule({
      imports: [MovieItemComponent, HttpClientTestingModule],
      providers: [provideRouter([])],
    }).compileComponents();

    const movieItem: Movie = {
      id: 4,
      title: 'string',
      year: 2025,
      category: 'string',
      rating: 1,
      description: 'as',
    };

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movieItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.movie().id).toBe(4);
    const card = fixture.debugElement.queryAll(By.css('.movie-card'));
    expect(card.length).toEqual(1);

    const title = fixture.debugElement.query(By.css('.movie-title'));
    expect(title.nativeElement.textContent).toContain('string');
  });

  // it('should delete', fakeAsync(() => {
  //   const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
  //   deleteButton.nativeElement.click();
  //   fixture.detectChanges();
  //   spyOn(component, 'deleteItem').and.callThrough();
  //   tick();
  //   flush();
  //
  //   expect(component.deleteItem).toHaveBeenCalled();
  // }));

  // it('should call deleteMovie when deleteItem is called', fakeAsync(() => {
  //   // Arrange: Prepare the spy to return an observable when deleteMovie is called
  //   movieServiceSpy.deleteMovie.and.returnValue(of({id: 4})); // simulate a successful deletion
  //
  //   // Act: Call deleteItem method
  //   component.deleteItem(component.movie().id);
  //
  //   // Detect changes and run async operations
  //   fixture.detectChanges();
  //   tick();  // Simulate the passage of time for async operations
  //
  //   // Assert: Check that deleteMovie was called with the correct id
  //   expect(movieServiceSpy.deleteMovie).toHaveBeenCalledWith(4); // ensure the correct id was passed
  // }));
});
