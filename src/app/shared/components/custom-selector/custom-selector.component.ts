import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  Optional,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-custom-selector',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './custom-selector.component.html',
  styleUrl: './custom-selector.component.css',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CustomSelectorComponent),
  //     multi: true,
  //   },
  // ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectorComponent
  implements AfterViewInit, ControlValueAccessor
{
  label = input<string>('');
  optionList = input<{ value: string; id: number }[]>();

  value = '';
  cdr = inject(ChangeDetectorRef);

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    if (this.optionList.length) {
      this.onOptionChange(this.optionList()![1]);
    }
  }

  private onChange: (value: string) => void = () => {
    this.cdr.markForCheck();
  };
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }
}
