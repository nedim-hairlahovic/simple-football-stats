import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchPlayer } from 'src/app/models/player';

import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search-players',
  templateUrl: './search-players.component.html',
  styleUrls: ['./search-players.component.css']
})
export class SearchPlayersComponent implements OnInit {
  searchKeyword: string = '';
  searchedPlayers: SearchPlayer[] = [];
  sub!: Subscription;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this.searchKeyword.length > 3) {
      this.sub = this.playerService.searchByName(this.searchKeyword).subscribe({
        next: _players => this.searchedPlayers = _players,
        error: err => console.log(err)
      });
    }
  }

}
