import { Component, input, inject, signal } from '@angular/core';
import { Bike } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
  ngOnInit(): void {
    this.bikeService.getBikebyId(this.id()).subscribe((bike) => {
      this.bike.set(bike);
    });
  }
}
