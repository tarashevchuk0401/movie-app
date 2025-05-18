import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { WebsocketService } from './core/services/web-socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [BreadcrumbService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'movies-app';
  breadcrumbService = inject(BreadcrumbService);
  websocketService = inject(WebsocketService);

  ngOnInit() {
    // this.breadcrumbService.set('@home', 'Home page');
    // this.getMessage();
  }

  getMessage() {
    this.websocketService.getMessages().subscribe((d) => console.log('get', d));
  }

  sendMessage() {
    this.websocketService.sendMessage('My message');
  }
}
