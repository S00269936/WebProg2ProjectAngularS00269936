import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Bike } from '../models/bike.model';
import { catchError } from 'rxjs/operators';

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

  addBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl, bike).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      if (error.status == 401 || error.status == 403) {

        console.error('authorisation issue ' , error.status );
         return throwError(() => new Error('You are not authorised for that action'));

      }
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
