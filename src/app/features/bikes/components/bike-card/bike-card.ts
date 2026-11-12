import { Component, input } from '@angular/core';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-bike-card',
  imports: [],
  templateUrl: './bike-card.html',
  styleUrl: './bike-card.scss',
})
export class BikeCard {
  bike = input.required<Bike>();
}
