import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
  }

  public getItems(authToken: string, itemName: string): Promise<any> {
    const url = `${this.baseUrl}/${itemName}/`;
    const headers = new HttpHeaders({ [Constants.TOKEN_HEADER]: authToken });
    const options = { headers };

    return this.http.get(url, options).toPromise();
  }

  public deleteItem(itemId: string, authToken: string, itemName: string) {
    const url = `${this.baseUrl}/${itemName}/${itemId}`;
    const headers = new HttpHeaders({ [Constants.TOKEN_HEADER]: authToken });
    const options = { headers };

    return this.http.delete(url, options).toPromise();
  }
}
