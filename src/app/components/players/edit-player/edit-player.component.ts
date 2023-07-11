import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  playerId: number = 0;
  playerForm!: FormGroup;
  positions: any[] = [];
  detailedPositions: any[] = [];
  sub!: Subscription;
  errorMessage?: string | null;

  constructor(private playerService: PlayerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.playerForm = this.fb.group({
      position: [''],
      detailPosition: [''],
      birthDate: [''],
      birthPlace: ['']
    });
  }

  ngOnInit(): void {
    this.positions = this.playerService.getPositions();
    this.detailedPositions = this.playerService.getDetailedPositions();

    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id > 0) {
        this.playerId = id;
        this.fetchPlayer(id);
      }
    });
  }


  fetchPlayer(id: number): void {
    this.playerService.getPlayer(id).subscribe({
      next: _player => this.updateForm(_player),
      // error: err => this.handleError(err)
    });
  }

  updateForm(player: Player): void {
    this.playerForm.get('position')?.setValue(player.position),
      this.playerForm.get('detailPosition')?.setValue(player.detailPosition),
      this.playerForm.get('birthDate')?.setValue(player.birthDate),
      this.playerForm.get('birthPlace')?.setValue(player.birthPlace)
  }

  submitForm(): void {
    if (this.playerForm.valid) {
      const request = {
        position: this.playerForm.get('position')?.value,
        detailPosition: this.playerForm.get('detailPosition')?.value,
        birthDate: this.playerForm.get('birthDate')?.value,
        birthPlace: this.playerForm.get('birthPlace')?.value,
      } as any;

      this.playerService.updatePlayer(this.playerId, request)
        .subscribe({
          next: () => this.onSaveComplete(),
          // error: err => this.handleError(err)
        })
    }
  }

  onSaveComplete(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/players/' + this.playerId]);
  }

}
