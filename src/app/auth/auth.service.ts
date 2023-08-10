import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
  }

  public clearToken(){
    sessionStorage.clear();
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem(Constants.TOKEN_HEADER);

    return !!token;
  }

  public login(email: string, password: string): Promise<any> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post(url, body, {
      observe: 'response',
      responseType: 'arraybuffer'
    }).toPromise();
  }

  public patchRecoverPassword(password: string, authToken: string) {
    const body = { password };
    const routeUrl = `${this.baseUrl}/auth/change/password`;
    const headers = new HttpHeaders({ [Constants.TOKEN_HEADER]: authToken });
    const options = { headers };

    return this.http.patch(routeUrl, body, options);
  }
}
