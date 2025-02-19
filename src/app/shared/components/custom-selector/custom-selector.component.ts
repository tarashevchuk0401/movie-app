import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-selector',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './custom-selector.component.html',
  styleUrl: './custom-selector.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectorComponent implements AfterViewInit {
  label = input<string>('');
  optionList = input.required<{ value: string; id: number }[]>();
  value = '';

  ngAfterViewInit() {
    this.value = this.optionList()[0].value;
    this.onOptionChange(this.value);
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onOptionChange(value: any): void {
    this.value = value.value;
    this.onChange(value.value);
    this.onTouched();
  }
}
