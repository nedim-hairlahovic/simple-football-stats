import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Competition } from 'src/app/models/competition';
import { CompetitionSeasonScraperRequest } from 'src/app/models/scraper';
import { Season } from 'src/app/models/season';
import { CompetitionService } from 'src/app/services/competition.service';
import { ScraperService } from 'src/app/services/scraper.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-competition-season',
  templateUrl: './competition-season.component.html'
})
export class CompetitionSeasonComponent implements OnInit {
  competitions: Competition[] = [];
  seasons: Season[] = [];
  sub!: Subscription;
  scaperForm!: FormGroup;

  constructor(private seasonService: SeasonService, private competitionService: CompetitionService, private scraperService: ScraperService, private router: Router, private fb: FormBuilder) {
    this.scaperForm = this.fb.group({
      competitionId: ['', Validators.required],
      seasonId: ['', Validators.required],
      url: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.fetchCompetitions();
    this.fetchSeasons();
  }

  fetchCompetitions(): void {
    this.sub = this.competitionService.getCompetitions().subscribe({
      next: _data => this.competitions = _data,
      error: err => console.log(err)
    });
  }

  fetchSeasons(): void {
    this.sub = this.seasonService.getSeasons().subscribe({
      next: _data => this.seasons = _data,
      error: err => console.log(err)
    });
  }

  isInvalid(inputName: string): boolean | undefined {
    return (this.scaperForm.get(inputName)?.touched || this.scaperForm.get(inputName)?.dirty) && !this.scaperForm.get(inputName)?.valid;
  }

  submitForm(): void {
    if (this.scaperForm.valid) {
      const request = {
        competitionId: this.scaperForm.get('competitionId')?.value,
        seasonId: this.scaperForm.get('seasonId')?.value,
        url: this.scaperForm.get('url')?.value,
      } as CompetitionSeasonScraperRequest;

      // console.log(request)

      this.scraperService.extractAndSaveCompetitionSeason(request)
        .subscribe({
          next: () => this.onSaveComplete(),
          // error: err => this.handleError(err)
        })
    }
  }

  onSaveComplete(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/competitions']);
  }

}
