import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/v1/users';

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserById(id: string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  addUser(user: CreateUserDto) {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(id: string, user: Partial<CreateUserDto>) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
