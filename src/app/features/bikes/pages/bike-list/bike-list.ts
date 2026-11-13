import { Component, inject } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { AsyncPipe } from '@angular/common';
import { BikeCard } from '../../components/bike-card/bike-card';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state.js'


@Component({
  selector: 'app-bike-list',
  imports: [AsyncPipe, BikeCard, RouterLink],
  templateUrl: './bike-list.html',
  styleUrl: './bike-list.scss',
})
export class BikeList{
  private bikeService = inject(BikeService);
  bikes = toSignal(this.bikeService.getBikes());
  state = toSignal(withLoadState(this.bikeService.getBikes()), { requireSync: true });
}
