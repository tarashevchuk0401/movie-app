import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMovieComponent } from './new-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { UniqueTitleValidator } from '../../../../core/validators/unique-title.validator';
import { BreadcrumbService } from 'xng-breadcrumb';
import { of } from 'rxjs';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;

  beforeEach(async () => {
    const mockMovieService = jasmine.createSpyObj('MovieService', ['isTitleUnique']);
    mockMovieService.isTitleUnique.and.returnValue(of(true));

    const mockUniqueTitleValidator = jasmine.createSpyObj('UniqueTitleValidator', ['titleValidator']);
    mockUniqueTitleValidator.titleValidator.and.callFake(() => {
      return (control: any) => {
        return of(null);
      };
    });

    await TestBed.configureTestingModule({
      imports: [NewMovieComponent, HttpClientTestingModule, ],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        { provide: MovieService, useValue: mockMovieService },
        { provide: UniqueTitleValidator, useValue: mockUniqueTitleValidator },
        { provide: BreadcrumbService, useValue: jasmine.createSpyObj('BreadcrumbService', ['set']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
