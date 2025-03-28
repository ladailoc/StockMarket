import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getUserById(id: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/users/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  addUser(newUser: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient.post<any>(url, newUser, this.httpOptions);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/users/${user.id}`;
    return this.httpClient.put<any>(url, user, this.httpOptions);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/users/${userId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
