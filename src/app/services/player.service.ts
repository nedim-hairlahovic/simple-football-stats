import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DuplicatePlayer } from '../models/duplicate-player';
import { SearchPlayer } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly publicBaseUrl = `${environment.backendUrl}/api/v1/players`;
  private readonly adminBaseUrl = `${environment.backendUrl}/api/v1/admin/players`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  searchByName(keyword: string): Observable<SearchPlayer[]> {
    let params = new HttpParams();
    params = params.set('name', keyword);

    return this.http.get<SearchPlayer[]>(`${this.publicBaseUrl}/search?${params.toString()}`);
  }

  getPossibleDuplicatePlayers(): Observable<DuplicatePlayer[]> {
    return this.http.get<DuplicatePlayer[]>(`${this.adminBaseUrl}/duplicates`);
  }

  mergeDuplicatePlayers(basePlayerId: number, duplicatePlayerId: number): Observable<{}> {
    let params = new HttpParams();
    params = params.set('basePlayerId', basePlayerId);
    params = params.set('duplicatePlayerId', duplicatePlayerId);

    return this.http.get<any>(`${this.adminBaseUrl}/duplicates/merge?${params.toString()}`);
  }

}
