import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../../core/services/chat-service';
import { Message } from '../../../../core/dto/chat/chat-interface';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrl: './chat-details.component.css',
  imports: [JsonPipe],
})
export class ChatDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);

  chatId = this.activatedRoute.snapshot.paramMap.get('id');
  messages = signal<Message[]>([]);

  ngOnInit() {
    this.getChatDetails();
  }

  getChatDetails() {
    this.chatService.getChatDetails(this.chatId!).subscribe((chatDetails) => {
      this.messages.set(chatDetails.messages);
      console.log(chatDetails);
      console.log(this.messages());
    });
  }
}
