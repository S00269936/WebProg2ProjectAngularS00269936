import { Component, input, inject, signal, effect } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { RentalService } from '../../services/rental.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { DatePipe } from '@angular/common';

//displaying bike image with rental
import { BikeService } from '../../../bikes/services/bike.service';
import { Bike } from '../../../bikes/models/bike.model';

@Component({
  selector: 'app-rental-details',
  imports: [RouterLink, MatAnchor, DatePipe],
  templateUrl: './rental-details.html',
  styleUrl: './rental-details.scss',
})
export class RentalDetails {
  private router = inject(Router);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();
  private rentalService = inject(RentalService);
  readonly rental = signal<Rental | null>(null);
  readonly initial: LoadState<Rental> = {status: 'loading'};
  private bikeService = inject(BikeService);
  bike = signal<Bike | null>(null);

  state = toSignal(toObservable(this.id).pipe(switchMap((id) => withLoadState(this.rentalService.getRentalById(id))),
    ),
    { initialValue: this.initial },
  );
  

  ngOnInit(): void {
    this.rentalService.getRentalById(this.id()).subscribe((rental) => {
      this.rental.set(rental);
    });
  }

  deleteRental(rental: Rental): void {
    if (!rental._id) return;
    if (!confirm(`Delete ${rental.bikeName}?`)) return;
    this.deleting.set(true);
    this.deleteError.set(null);
    this.rentalService.deleteRental(rental._id).subscribe({
      next: () => this.router.navigate(['/rentals']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
  loadBike(bikeId: string): void {
    this.bikeService.getBikebyId(bikeId).subscribe({
      next: (bike) => this.bike.set(bike),
      error: (err) => console.error('Error loading bike:', err)
    });
  }
  constructor() {
    //this method waits for the state to load and then calls the above method by using the bike id
    effect(() => {
      const s = this.state();
      if (s.status === 'loaded') {
        this.loadBike(s.data.bike);
      }
    });
  }
}
