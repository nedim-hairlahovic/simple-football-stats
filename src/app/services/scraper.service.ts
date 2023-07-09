import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CompetitionSeasonScraperRequest } from '../models/scraper';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  private readonly baseUrl = `${environment.backendUrl}/api/v1/scraper`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  extractAndSaveCompetitionSeason(request: CompetitionSeasonScraperRequest): Observable<any> {
    const url = `${this.baseUrl}/competition/save`
    return this.http.post<any>(url, request, { headers: this.headers });
  }

}
