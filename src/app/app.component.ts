import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [BreadcrumbService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'movies-app';
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.set('@home', 'Home page');
  }
}
