import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DuplicatePlayer } from '../models/duplicate-player';
import { Player, PlayerSeasonMatch, PlayerSeasonStats, SearchPlayer } from '../models/player';

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

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.publicBaseUrl}/${id}`);
  }

  updatePlayer(id: number, playerRequest: any): Observable<Player> {
    const url = `${this.adminBaseUrl}/${id}`;
    return this.http.put<Player>(url, playerRequest, { headers: this.headers });
  }

  getSeasonStats(id: number, season: string): Observable<PlayerSeasonStats[]> {
    let params = new HttpParams();
    params = params.set('season', season);
    
    return this.http.get<PlayerSeasonStats[]>(`${this.publicBaseUrl}/${id}/stats?${params.toString()}`);
  }

  getSeasonMatches(id: number, season: string): Observable<PlayerSeasonMatch[]> {
    let params = new HttpParams();
    params = params.set('season', season);
    
    return this.http.get<PlayerSeasonMatch[]>(`${this.publicBaseUrl}/${id}/matches?${params.toString()}`);
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

  getPositions(): any[] {
    return [ 
      { key: 'GOALKEEPER', name: 'GOALKEEPER'},
      { key: 'DEFENDER', name: 'DEFENDER'},
      { key: 'MIDFIELDER', name: 'MIDFIELDER'},
      { key: 'FORWARD', name: 'FORWARD'}
    ] as any[];
  }

  getDetailedPositions(): any[] {
    return [ 
      { key: 'CENTRE_BACK', name: 'CENTRE_BACK'},
      { key: 'RIGHT_BACK', name: 'RIGHT_BACK'},
      { key: 'LEFT_BACK', name: 'LEFT_BACK'},
      { key: 'DEFENSIVE_MIDFIELD', name: 'DEFENSIVE_MIDFIELD'},
      { key: 'CENTRAL_MIDFIELD', name: 'CENTRAL_MIDFIELD'},
      { key: 'ATTACKING_MIDFIELD', name: 'ATTACKING_MIDFIELD'},
      { key: 'RIGHT_MIDFIELD', name: 'RIGHT_MIDFIELD'},
      { key: 'LEFT_MIDFIELD', name: 'LEFT_MIDFIELD'},
      { key: 'RIGHT_WINGER', name: 'RIGHT_WINGER'},
      { key: 'LEFT_WINGER', name: 'LEFT_WINGER'},
      { key: 'SECOND_STRIKER', name: 'SECOND_STRIKER'},
      { key: 'CENTRE_FORWARD', name: 'CENTRE_FORWARD'},
    ] as any[];
  }

}
