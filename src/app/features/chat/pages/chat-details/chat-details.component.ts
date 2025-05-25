import {
  AfterViewInit,
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
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import {
  ChatMessage,
  WebsocketService,
} from '../../../../core/services/web-socket.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrl: './chat-details.component.scss',
  imports: [
    NgClass,
    DatePipe,
    CustomInputComponent,
    MainButtonComponent,
    ReactiveFormsModule,
    JsonPipe,
    MatIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDetailsComponent implements OnInit, AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);
  authService = inject(AuthService);
  websocketService = inject(WebsocketService);
  destroyRef = inject(DestroyRef);

  @ViewChild('messageBox') messageBox!: ElementRef;

  chatId = this.activatedRoute.snapshot.paramMap.get('id');
  messages = signal<Message[]>([]);
  newMessageText = new FormControl('');
  receiver = signal<string[]>([]);

  ngOnInit() {
    this.getChatDetails();
    this.joinRoom();
    this.getMessages();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.scrollToBottom();
    }, 100);
  }

  sendMessage() {
    if (!this.newMessageText.value) return;

    const request: ChatMessage = {
      roomId: this.chatId!,
      text: this.newMessageText.value ?? '',
      sender: this.authService.currentUserId()!,
    };

    this.websocketService.sendMessage(request);
    this.newMessageText.reset();
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
          this.scrollToBottom();
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

  private scrollToBottom(): void {
    this.messageBox.nativeElement.scrollTop =
      this.messageBox.nativeElement.scrollHeight;
  }
}
