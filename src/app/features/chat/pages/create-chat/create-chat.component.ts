import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatService } from '../../../../core/services/chat-service';
import { Participant } from '../../../../core/dto/chat/chat-interface';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.css',
  imports: [JsonPipe],
})
export class CreateChatComponent implements OnInit {
  chatService = inject(ChatService);
  router = inject(Router);

  participantsList = signal<Participant[]>([]);

  ngOnInit() {
    this.chatService
      .getParticipants()
      .subscribe((participants) => this.participantsList.set(participants));
  }

  onCreate(userId: string): void {
    this.chatService.createChat(userId).subscribe(() => this.router.navigate(['/home/chat']),);
  }
}
