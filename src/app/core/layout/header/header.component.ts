import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CustomInputComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  headerSection: string[] = ['Movies', 'Serials', 'TOP-100'];
}
