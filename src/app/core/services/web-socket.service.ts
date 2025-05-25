import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import {consumerPollProducersForChange} from '@angular/core/primitives/signals';
import {Message} from '../dto/chat/chat-interface';

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

  constructor() {
    this.socket = io('http://localhost:3000');
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
        console.log(data);
       return  observer.next(data)
      });
    });
  }

  close() {
    this.socket.disconnect();
  }
}
