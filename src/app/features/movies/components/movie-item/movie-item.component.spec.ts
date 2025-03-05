import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemComponent } from './movie-item.component';
import {provideRouter} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Movie} from '../../interfaces/movie';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();

    const movieItem: Movie = {
      id: 4,
      title: 'string',
      year: 2025,
      category: 'string',
      rating: 1,
      description: 'as',
    }

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movieItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
