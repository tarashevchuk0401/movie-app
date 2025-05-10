import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Socket.IO client
  }

  sendMessage(message: string) {
    this.socket.emit('message', { sender: 'Angular', message });
  }

  getMessages() {
    return new Observable((observer) => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  close() {
    this.socket.disconnect();
  }
}
