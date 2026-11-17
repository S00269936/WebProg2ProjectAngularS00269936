import { Component, inject } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state.js'
import { RentalCard } from '../../components/rental-card/rental-card';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-rental-list',
  imports: [RouterLink, RentalCard, MatAnchor],
  templateUrl: './rental-list.html',
  styleUrl: './rental-list.scss',
})
export class RentalList {
  private rentalService = inject(RentalService);
  rentals = toSignal(this.rentalService.getRentals());
  state = toSignal(withLoadState(this.rentalService.getRentals()), { requireSync: true })
}
