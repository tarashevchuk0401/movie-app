import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPageComponent } from './company-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';

describe('CompanyPageComponent', () => {
  let component: CompanyPageComponent;
  let fixture: ComponentFixture<CompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPageComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
