import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { AiMessage, Message } from '../../../../core/dto/chat/chat-interface';
import { ChatMessageBoxComponent } from '../../components/chat-message-box/chat-message-box.component';
import { AiService } from '../../../../core/services/ai.service';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatInputComponent, ChatMessageBoxComponent, MatIcon],
})
export class ChatAiComponent {
  aiService = inject(AiService);
  authService = inject(AuthService);
  messages = signal<Message[]>([]);

  sendMessage(message: string): void {
    this.addMyMessage(message);

    this.aiService.sendMessageToAi(message).subscribe((message: AiMessage) => {
      const newMessage: Message = {
        text: message.text,
        createdAt: message.createdAt,
        id: Date.now().toString(),
        sender: {
          id: 'ai',
        },
      };
      this.messages.update((v) => [...v, newMessage]);
    });
  }

  private addMyMessage(message: string): void {
    const newMessage: Message = {
      text: message,
      createdAt: new Date(),
      id: Date.now().toString(),
      sender: {
        id: this.authService.currentUserId() || '',
      },
    };

    this.messages.update((v) => [...v, newMessage]);
  }
}
