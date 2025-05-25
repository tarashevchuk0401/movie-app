import { Injectable } from '@angular/core';
import { ApiService } from '../abstracts/api-service';
import { Observable } from 'rxjs';
import { Chat, ChatDetails, Participant } from '../dto/chat/chat-interface';
import { SuccessResponse } from '../interfaces/success-response';
import {CreateChatResponse} from '../dto/chat/responses/create-chat-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends ApiService {
  getChatList(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl + '/chat/list');
  }

  getChatDetails(chatId: string): Observable<ChatDetails> {
    return this.http.get<ChatDetails>(this.baseUrl + '/chat/item/' + chatId);
  }

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.baseUrl + '/chat/participants');
  }

  createChat(userId: string): Observable<CreateChatResponse> {
    const request = {
      title: '',
      isGroup: false,
      usersId: [userId],
    };
    return this.http.post<CreateChatResponse>(
      this.baseUrl + '/chat/create',
      request,
    );
  }
}
