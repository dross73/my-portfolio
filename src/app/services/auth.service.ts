import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app without needing to add it to providers
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/api/users/login';
 // This is the URL to the login endpoint

  constructor(private http: HttpClient) { }

  // This method sends the login data to the backend and returns the response
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }
}
