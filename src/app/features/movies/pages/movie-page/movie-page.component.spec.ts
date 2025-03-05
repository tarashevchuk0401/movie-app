import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePageComponent } from './movie-page.component';
import {provideRouter} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MoviePageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePageComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
