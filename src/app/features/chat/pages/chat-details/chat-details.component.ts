import {
  AfterViewInit,
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
import { Message } from '../../../../core/dto/chat/chat-interface';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import {
  ChatMessage,
  WebsocketService,
} from '../../../../core/services/web-socket.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrl: './chat-details.component.css',
  imports: [
    NgClass,
    DatePipe,
    CustomInputComponent,
    MainButtonComponent,
    ReactiveFormsModule,
  ],
})
export class ChatDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);
  authService = inject(AuthService);
  websocketService = inject(WebsocketService);
  destroyRef = inject(DestroyRef);

  chatId = this.activatedRoute.snapshot.paramMap.get('id');
  messages = signal<Message[]>([]);
  newMessageText = new FormControl('');

  @ViewChild('messageBox') messageBox!: ElementRef;

  scrollToBottom(): void {
    console.log('SCROLL')
    this.messageBox.nativeElement.scrollTop =
      this.messageBox.nativeElement.scrollHeight;
  }



  ngOnInit() {
    this.getChatDetails();
    this.joinRoom();
    this.getMessages();
    // setTimeout(() => {
    // }, 1000);
  }



  sendMessage() {
    const request: ChatMessage = {
      roomId: this.chatId!,
      text: this.newMessageText.value ?? '',
      sender: this.authService.currentUserId()!,
    };

    this.websocketService.sendMessage(request);
    this.newMessageText.reset();
  }

  private joinRoom() {
    this.websocketService.joinRoom(this.chatId!);

  }

  private getMessages() {
    this.websocketService
      .getMessages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message: Message) => {
        console.log(message)
        this.messages.update((v) =>
          [...v, message].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          ),
        );
        this.scrollToBottom();
      });
  }

  getChatDetails() {
    this.chatService.getChatDetails(this.chatId!).subscribe((chatDetails) => {
      this.messages.set(chatDetails.messages);
    });
  }
}
