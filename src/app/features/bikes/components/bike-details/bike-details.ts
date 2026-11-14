import { Component, input, inject, signal } from '@angular/core';
import { Bike } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';
import { LoadState, withLoadState } from '../../../../shared/load-state.js';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-bike-details',
  imports: [RouterLink, MatAnchor],
  templateUrl: './bike-details.html',
  styleUrl: './bike-details.scss',
})
export class BikeDetails {
  private router = inject(Router);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();
  private bikeService = inject(BikeService);
  readonly bike = signal<Bike | null>(null);
  readonly initial: LoadState<Bike> = {status: 'loading'};

  state = toSignal(toObservable(this.id).pipe(switchMap((id) => withLoadState(this.bikeService.getBikebyId(id))),
    ),
    { initialValue: this.initial },
  );


  ngOnInit(): void {
    this.bikeService.getBikebyId(this.id()).subscribe((bike) => {
      this.bike.set(bike);
    });
  }

  
  
deleteBike(bike: Bike): void {
  if (!bike._id) return;
  if (!confirm(`Delete ${bike.bikeName}?`)) return;
  this.deleting.set(true);
  this.deleteError.set(null);
  this.bikeService.deleteBike(bike._id).subscribe({
    next: () => this.router.navigate(['/bikes']),
    error: (err: Error) => {
      this.deleteError.set(err.message);
      this.deleting.set(false);
    },
  });
}
}