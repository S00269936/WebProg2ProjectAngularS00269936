import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BikeList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('WebProg2ProjectAngular');
}
