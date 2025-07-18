import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Message } from '../dto/chat/chat-interface';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  roomId: string;
  text: string;
  sender: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  // private baseUrl = environment.apiUrl;
  private baseUrl = 'http://54.166.53.187:3000';

  constructor() {
    this.socket = io(this.baseUrl);
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', roomId);
  }

  sendMessage(data: ChatMessage) {
    this.socket.emit('private-message', data);
  }

  getMessages(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('private-message', (data: Message) => {
        return observer.next(data);
      });
    });
  }

  close() {
    this.socket.disconnect();
  }
}
