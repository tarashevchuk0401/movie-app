import {ApiService} from '../abstracts/api-service';
import { Injectable, } from '@angular/core';
import {AiMessage, Message} from '../dto/chat/chat-interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService extends ApiService{

  sendMessageToAi(text: string): Observable<AiMessage> {
    return this.http.post<AiMessage>(
      this.baseUrl + '/ai/movie-recommendation',
      { text },
    );
  }
}
