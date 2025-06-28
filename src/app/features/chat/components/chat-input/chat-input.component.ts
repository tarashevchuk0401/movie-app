import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  imports: [CustomInputComponent, ReactiveFormsModule, MainButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  predefinedMessage = input<string>('')
  sendMessage = output<string>();
  messageInput = new FormControl();

  //TODO: SET predefined value

  send(): void {
    if (this.messageInput.value) {
      this.sendMessage.emit(this.messageInput.value);
      this.messageInput.reset();
    }
  }
}
