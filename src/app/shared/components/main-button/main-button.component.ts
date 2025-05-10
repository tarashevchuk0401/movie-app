import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-button',
  imports: [NgClass],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  text = input<string>('');
  isDisabled = input<boolean>(false);
  type = input('button');
}
