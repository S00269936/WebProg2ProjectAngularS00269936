import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Bike, CreateBikeDto } from '../models/bike.model';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/v1/bikes'; 

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl)
  }

  getBikebyId(id: string): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/${id}`);
  }

  addBike(bike: CreateBikeDto): Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl, bike)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    switch (error.status) {
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid.';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You are not allowed to do that.';
        break;
      case 404:
        message = 'That car could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }
    // Full details for the developer, a short message for the user
    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }
}
