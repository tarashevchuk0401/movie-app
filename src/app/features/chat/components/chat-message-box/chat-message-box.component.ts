import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { Message } from '../../../../core/dto/chat/chat-interface';
import { AuthService } from '../../../../core/services/auth.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-message-box',
  templateUrl: './chat-message-box.component.html',
  imports: [NgClass, DatePipe],
  styleUrl: './chat-message-box.component.scss',
})
export class ChatMessageBoxComponent {
  authService = inject(AuthService);
  @ViewChild('messageBox') messageBox!: ElementRef;

  messages = input<Message[]>([]);

  scrollToBottom(): void {
    this.messageBox.nativeElement.scrollTop =
      this.messageBox.nativeElement.scrollHeight;
  }
}
