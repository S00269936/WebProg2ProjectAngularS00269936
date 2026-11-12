import { Component, input } from '@angular/core';
import { Bike } from '../../models/bike.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bike-card',
  imports: [RouterLink],
  templateUrl: './bike-card.html',
  styleUrl: './bike-card.scss',
})
export class BikeCard {
  bike = input.required<Bike>();
}
