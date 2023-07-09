import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuplicatePlayersComponent } from './components/duplicate-players/duplicate-players.component';

const routes: Routes = [
  { path: 'duplicate-players', component: DuplicatePlayersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
