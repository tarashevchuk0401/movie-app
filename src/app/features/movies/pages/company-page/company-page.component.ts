import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-company-page',
  imports: [],
  templateUrl: './company-page.component.html',
  styleUrl: './company-page.component.scss',
})
export class CompanyPageComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.set('@company', 'Company');
  }
}
