import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AgeCategory, Competition, CompetitionRequest } from '../models/competition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private readonly publicBaseUrl = `${environment.backendUrl}/api/v1/competitions`;
  private readonly adminBaseUrl = `${environment.backendUrl}/api/v1/admin/competitions`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.publicBaseUrl}`);
  }
  
  createCompetition(competition: CompetitionRequest): Observable<Competition> {
    return this.http.post<Competition>(this.adminBaseUrl, competition, { headers: this.headers });
  }

  getAgeCategories(): AgeCategory[] {
    return [ 
      { key: 'SENIORS', name: 'SENIORS'},
      { key: 'U21', name: 'U21'},
      { key: 'U19', name: 'U19'},
      { key: 'U17', name: 'U17'},
      { key: 'U15', name: 'U15'},
      { key: 'YOUTH', name: 'YOUTH'}
    ] as AgeCategory[];
  }

}
