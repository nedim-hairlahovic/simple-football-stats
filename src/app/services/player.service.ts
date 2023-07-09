import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DuplicatePlayer } from '../models/duplicate-player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly adminBaseUrl = `${environment.backendUrl}/api/v1/admin/players`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getPossibleDuplicatePlayers(): Observable<DuplicatePlayer[]> {
    return this.http.get<DuplicatePlayer[]>(`${this.adminBaseUrl}/duplicates`);
  }

  mergeDuplicatePlayers(basePlayerId: number, duplicatePlayerId: number): Observable<{}> {
    console.log(basePlayerId, duplicatePlayerId);
    let params = new HttpParams();
    params = params.set('basePlayerId', basePlayerId);
    params = params.set('duplicatePlayerId', duplicatePlayerId);

    return this.http.get<any>(`${this.adminBaseUrl}/duplicates/merge?${params.toString()}`);
  }

}
