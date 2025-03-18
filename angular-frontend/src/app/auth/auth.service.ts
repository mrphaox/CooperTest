// src/app/core/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

// En AuthService (frontend)
login(email: string, password: string): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { login: email, password });
}


  register(userData: { username: string; email: string; password: string }) {
    return this.http.post('http://localhost:3000/users/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
