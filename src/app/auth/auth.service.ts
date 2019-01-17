import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = window.location.origin;
  }

  isAuthenticated(): boolean{
    const token = sessionStorage.getItem('token');

    return !!token;
  }

  login(email: string, password: string): Promise<any>{
    const url = `${this.baseUrl}/auth/login`;
    const body = {
      email,
      password
    };

    return this.http.post(url, body).toPromise();
  }
}
