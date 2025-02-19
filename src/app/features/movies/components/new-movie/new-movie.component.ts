import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-new-movie',
  imports: [],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMovieComponent {

}
