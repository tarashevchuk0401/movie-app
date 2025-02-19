import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    headerSection: string[] = ['Movies', 'Serials', 'TOP-100']
}
