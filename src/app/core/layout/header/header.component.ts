import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { GetMeResponse } from '../../dto/auth/responses/get-me-response.dto';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import {MainButtonComponent} from '../../../shared/components/main-button/main-button.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    CustomInputComponent,
    BreadcrumbComponent,
    MatIcon,
    MainButtonComponent,
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);

  user = signal<GetMeResponse | null>(null);

  ngOnInit() {
    this.authService.getMe().subscribe((user: GetMeResponse) => {
      this.user.set(user);
    });
  }
}
