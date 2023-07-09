import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DuplicatePlayersComponent } from './components/duplicate-players/duplicate-players.component';
import { SearchPlayersComponent } from './components/players/search-players/search-players.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';

const routes: Routes = [
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'players', component: SearchPlayersComponent },
  { path: 'duplicate-players', component: DuplicatePlayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
