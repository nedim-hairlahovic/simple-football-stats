import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Season } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private readonly publicBaseUrl = `${environment.backendUrl}/api/v1/seasons`;
  private readonly adminBaseUrl = `${environment.backendUrl}/api/v1/admin/seasons`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.publicBaseUrl}`);
  }

}
