import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike.model';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/v1/bikes'; 

  getCars(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl)
  }

}
