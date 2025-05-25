import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [RouterOutlet],
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
