import {Component, effect, input} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-button',
  imports: [NgClass],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  text = input<string>('');
  isDisabled = input<boolean>(false);

  constructor() {
    effect(() => {
      console.log('IsDis', this.isDisabled())
    });
  }
}
