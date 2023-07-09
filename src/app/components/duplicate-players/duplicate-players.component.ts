import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DuplicatePlayer } from 'src/app/models/duplicate-player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-duplicate-players',
  templateUrl: './duplicate-players.component.html',
  styleUrls: ['./duplicate-players.component.css']
})
export class DuplicatePlayersComponent implements OnInit {
  duplicatePlayers: DuplicatePlayer[] = [];
  sub!: Subscription;

  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPossibleDuplicatePlayers();
  }

  fetchPossibleDuplicatePlayers(): void {
    this.sub = this.playerService.getPossibleDuplicatePlayers().subscribe({
      next: _players => this.duplicatePlayers = _players,
      error: err => console.log(err)
    });
  }

  mergePlayers(duplicatePlayer: DuplicatePlayer) {
    const basePlayerId = duplicatePlayer.players[0].id;
    const duplicatePlayerId = duplicatePlayer.players[1].id;
    this.sub = this.playerService.mergeDuplicatePlayers(basePlayerId, duplicatePlayerId).subscribe({
      next: () => this.onMerge(),
      error: err => console.log(err)
    });
  }

  onMerge(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/duplicate-players']);
  }


}
