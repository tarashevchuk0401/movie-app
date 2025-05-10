import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSelectorComponent } from './custom-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CustomSelectorComponent', () => {
  let component: CustomSelectorComponent;
  let fixture: ComponentFixture<CustomSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CustomSelectorComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
