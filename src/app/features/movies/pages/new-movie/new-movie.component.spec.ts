import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { NewMovieComponent } from './new-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { UniqueTitleValidator } from '../../../../core/validators/unique-title.validator';
import { BreadcrumbService } from 'xng-breadcrumb';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;
  let breadcrumbServiceSpy: jasmine.SpyObj<BreadcrumbService>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const mockMovieService = jasmine.createSpyObj('MovieService', [
      'isTitleUnique',
    ]);
    mockMovieService.isTitleUnique.and.returnValue(of(true));
    breadcrumbServiceSpy = jasmine.createSpyObj('BreadcrumbService', ['set']);

    const mockUniqueTitleValidator = jasmine.createSpyObj(
      'UniqueTitleValidator',
      ['titleValidator'],
    );
    mockUniqueTitleValidator.titleValidator.and.callFake(() => {
      return (control: any) => {
        return of(null);
      };
    });

    TestBed.configureTestingModule({
      imports: [NewMovieComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        { provide: MovieService, useValue: mockMovieService },
        { provide: UniqueTitleValidator, useValue: mockUniqueTitleValidator },
        { provide: BreadcrumbService, useValue: breadcrumbServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set breadcrumb on init', () => {
    expect(breadcrumbServiceSpy.set).toHaveBeenCalledWith(
      '@new-movie',
      'Add new movie',
    );

    expect(component.movieForm).toBeTruthy();
    expect(component.movieForm.controls.actors.length).toBe(0);
    expect(component.movieForm.value.title).toBe('Star wars');
    const categoryControl = component.movieForm.controls.category;
    expect(categoryControl.hasValidator(Validators.required)).toBeTrue();
  });

  it('should add actor input', fakeAsync(() => {
    const button = fixture.debugElement.query(
      By.css('.add-actor'),
    ).nativeElement;
    spyOn(component, 'addActor').and.callThrough();

    button.click();
    fixture.detectChanges();
    tick();

    expect(component.addActor).toHaveBeenCalled();
    expect(component.movieForm.controls.actors.length).toBe(1);
  }));

  it('should remove actor input', fakeAsync(() => {
    const buttonAdd = fixture.debugElement.query(
      By.css('.add-actor'),
    ).nativeElement;

    spyOn(component, 'addActor').and.callThrough();

    buttonAdd.click();
    fixture.detectChanges();
    tick();

    expect(component.addActor).toHaveBeenCalled();
    expect(component.movieForm.controls.actors.length).toBe(1);

    const buttonRemove = fixture.debugElement.query(
      By.css('.remove-actor'),
    ).nativeElement;
    spyOn(component, 'removeActor').and.callThrough();
    buttonRemove.click();
    fixture.detectChanges();
    tick();
    expect(component.removeActor).toHaveBeenCalled();
    expect(component.movieForm.controls.actors.length).toBe(0);
  }));

  it('should enable actor validation', fakeAsync(() => {
    const button = fixture.debugElement.query(
      By.css('.add-actor'),
    ).nativeElement;
    spyOn(component, 'addActor').and.callThrough();

    button.click();
    fixture.detectChanges();
    tick();

    expect(component.addActor).toHaveBeenCalled();
    expect(component.movieForm.controls.actors.length).toBe(1);

    const validateCheckbox = fixture.debugElement.query(
      By.css('.validate-checkbox'),
    ).nativeElement;
    validateCheckbox.click();
    fixture.detectChanges();
    tick();

    const actorControl = component.movieForm.controls.actors.at(0).get('actor');

    expect(actorControl!.hasValidator(Validators.required)).toBeTrue();

    validateCheckbox.click();
    fixture.detectChanges();
    tick();

    expect(actorControl!.hasValidator(Validators.required)).toBeFalse();
  }));

  it('should submit form', fakeAsync(() => {
    component.movieForm.controls.title.setValue('Inception');
    component.movieForm.controls.description.setValue(
      'A mind-bending thriller',
    );
    component.movieForm.controls.category.setValue('Action');

    component.addActor();
    expect(component.movieForm.controls.actors.length).toBe(1);
    component.movieForm.controls.actors
      .at(0)
      .get('actor')
      ?.setValue('Leonardo DiCaprio');

    fixture.detectChanges();
    tick();
    expect(component.movieForm.status).toBe('VALID');
    spyOn(component, 'onSubmit').and.callThrough();

    const submitButton = fixture.debugElement.query(
      By.css('.submit'),
    ).nativeElement;
    submitButton.click();

    expect(component.movieForm.value).toEqual({
      title: 'Inception',
      description: 'A mind-bending thriller',
      category: 'Action',
      actors: [{ actor: 'Leonardo DiCaprio' }],
    });
  }));
});
