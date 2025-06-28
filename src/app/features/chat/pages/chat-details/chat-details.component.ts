import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../../core/services/chat-service';
import { Message, Participant } from '../../../../core/dto/chat/chat-interface';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import {
  ChatMessage,
  WebsocketService,
} from '../../../../core/services/web-socket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatMessageBoxComponent } from '../../components/chat-message-box/chat-message-box.component';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrl: './chat-details.component.scss',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    ChatInputComponent,
    ChatMessageBoxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);
  authService = inject(AuthService);
  websocketService = inject(WebsocketService);
  destroyRef = inject(DestroyRef);
  @ViewChild('messageBox') messageBoxComponent!: ChatMessageBoxComponent;

  chatId = this.activatedRoute.snapshot.paramMap.get('id');
  messages = signal<Message[]>([]);
  receiver = signal<string[]>([]);

  ngOnInit() {
    this.getChatDetails();
    this.joinRoom();
    this.getMessages();
  }

  sendMessage(message: string) {
    if (!message) return;

    const request: ChatMessage = {
      roomId: this.chatId!,
      text: message,
      sender: this.authService.currentUserId()!,
    };

    this.websocketService.sendMessage(request);
  }

  private joinRoom(): void {
    this.websocketService.joinRoom(this.chatId!);
  }

  private getMessages(): void {
    this.websocketService
      .getMessages()
      .pipe(takeUntilDestroyed(this.destroyRef), delay(100))
      .subscribe((message: Message) => {
        this.messages.update((v) =>
          [...v, message].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          ),
        );
        setTimeout(() => {
          this.messageBoxComponent?.scrollToBottom();
        }, 100);
      });
  }

  getChatDetails(): void {
    this.chatService.getChatDetails(this.chatId!).subscribe((chatDetails) => {
      this.messages.set(chatDetails.messages);
      this.getReceiverName(chatDetails.participants);
    });
  }

  private getReceiverName(participants: Participant[]): void {
    const names = participants
      .filter((user) => user.id !== this.authService.currentUserId())
      .map((u) => `${u.firstName} ${u.lastName}`);
    this.receiver.set(names);
  }
}
