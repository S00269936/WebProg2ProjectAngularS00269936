import { Component, input } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rental-card',
  imports: [RouterLink],
  templateUrl: './rental-card.html',
  styleUrl: './rental-card.scss',
})
export class RentalCard {
  rental = input.required<Rental>();
}
