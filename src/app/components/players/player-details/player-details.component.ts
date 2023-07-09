import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Player, PlayerSeasonMatch, PlayerSeasonStats } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  playerId: number = 0;
  player!: Player;
  stats: PlayerSeasonStats[] = [];
  matches: PlayerSeasonMatch[] = [];
  sub!: Subscription;

  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id > 0) {
        this.playerId = id;
        this.fetchPlayer(id);
        this.fetchStats(id)
        this.fetchMatches(id)
      }
    });
  }

  fetchPlayer(id: number) {
    this.playerService.getPlayer(id).subscribe({
      next: _player => this.player = _player,
      // error: err => this.handleError(err)
    });
  }

  fetchStats(id: number) {
    this.playerService.getSeasonStats(id, "2022").subscribe({
      next: _stats => this.stats = _stats,
      // error: err => this.handleError(err)
    });
  }

  fetchMatches(id: number) {
    this.playerService.getSeasonMatches(id, "2022").subscribe({
      next: _matches => this.matches = _matches,
      // error: err => this.handleError(err)
    });
  }


}
