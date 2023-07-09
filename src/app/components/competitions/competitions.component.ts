import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AgeCategory, Competition, CompetitionRequest } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  sub!: Subscription;
  addCompetitionForm!: FormGroup;
  ageCategories: AgeCategory[] = [];
  errorMessage?: string | null;

  constructor(private competitionService: CompetitionService, private fb: FormBuilder, private router: Router) {
    this.addCompetitionForm = this.fb.group({
      name: ['', Validators.required],
      rank: ['', Validators.required],
      ageCategory: ['', Validators.required]
    });
    this.ageCategories = this.competitionService.getAgeCategories();
  }

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.sub = this.competitionService.getCompetitions().subscribe({
      next: _data => this.competitions = _data,
      error: err => console.log(err)
    });
  }

  submitForm(): void {
    if (this.addCompetitionForm.valid) {
      const request = {
        name: this.addCompetitionForm.get('name')?.value,
        rank: this.addCompetitionForm.get('rank')?.value,
        ageCategory: this.addCompetitionForm.get('ageCategory')?.value,
      } as CompetitionRequest;

      this.competitionService.createCompetition(request)
        .subscribe({
          next: () => this.onSaveComplete(),
          // error: err => this.handleError(err)
        })
    }
  }

  isInvalid(inputName: string): boolean | undefined {
    return (this.addCompetitionForm.get(inputName)?.touched || this.addCompetitionForm.get(inputName)?.dirty) && !this.addCompetitionForm.get(inputName)?.valid;
  }

  onSaveComplete(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/competitions']);
  }

  handleError(error: any): void {
    if (error.status === 404) {
      // this.back();
    } else {
      this.errorMessage = `Something went wrong. Request can not be processed.`;
    }
  }

}
