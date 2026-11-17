import { Component, input } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-rental-card',
  imports: [RouterLink, MatAnchor],
  templateUrl: './rental-card.html',
  styleUrl: './rental-card.scss',
})
export class RentalCard {
  rental = input.required<Rental>();
}
