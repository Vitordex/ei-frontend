import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
  }

  patchRecoverPassword(password, authToken) {
    const body = { password };
    const routeUrl = `${this.baseUrl}/auth/change/password`;
    const headers = new HttpHeaders();
    headers.set('x-authentication-token', authToken);
    const options = { headers };

    return this.http.patch(routeUrl, password, options);
  }
}
