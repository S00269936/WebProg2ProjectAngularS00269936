import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rental, CreateRentalDto } from '../models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/v1/rentals';

  getRentals() {
    return this.http.get<Rental[]>(this.apiUrl);
  }

  getRentalById(id: string) {
    return this.http.get<Rental>(`${this.apiUrl}/${id}`);
  }

  addRental(rental: CreateRentalDto) {
    return this.http.post<Rental>(this.apiUrl, rental);
  }

  updateRental(id: string, rental: Partial<CreateRentalDto>) {
    return this.http.put<Rental>(`${this.apiUrl}/${id}`, rental);
  }

  deleteRental(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
