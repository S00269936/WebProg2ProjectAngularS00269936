import { Component, input, inject, signal } from '@angular/core';
import { Bike } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';
import { LoadState, withLoadState } from '../../../../shared/load-state.js';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-bike-details',
  imports: [],
  templateUrl: './bike-details.html',
  styleUrl: './bike-details.scss',
})
export class BikeDetails {
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
}
