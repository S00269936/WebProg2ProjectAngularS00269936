import { Component, inject, OnInit, input } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Observable } from 'rxjs';
import { Bike } from '../../models/bike.model';
import { AsyncPipe } from '@angular/common';
import { BikeCard } from '../../components/bike-card/bike-card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-bike-list',
  imports: [AsyncPipe, BikeCard, RouterLink],
  templateUrl: './bike-list.html',
  styleUrl: './bike-list.scss',
})
export class BikeList implements OnInit {
  private bikeService = inject(BikeService);
  bikes$!: Observable<Bike[]>;

  ngOnInit(): void {
    this.bikes$ = this.bikeService.getBikes();
  }

}
