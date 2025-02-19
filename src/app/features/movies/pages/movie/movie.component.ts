import { Component } from '@angular/core';
import {MovieListComponent} from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movie',
  imports: [MovieListComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

}
