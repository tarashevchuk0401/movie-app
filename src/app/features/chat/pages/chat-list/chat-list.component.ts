import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatService } from '../../../../core/services/chat-service';
import { Chat } from '../../../../core/dto/chat/chat-interface';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { RouterLink } from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  imports: [JsonPipe, MainButtonComponent, RouterLink, MatIcon],
})
export class ChatListComponent implements OnInit {
  chatService = inject(ChatService);
  authService = inject(AuthService);

  chatList = signal<Chat[]>([]);

  ngOnInit() {
    this.chatService.getChatList().subscribe((response) => {
      this.chatList.set(response);
    });
  }
}
