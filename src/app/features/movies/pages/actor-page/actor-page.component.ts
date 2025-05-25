import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-actor-page',
  imports: [],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.scss',
})
export class ActorPageComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.set('@actor', 'Actor');
  }
}
