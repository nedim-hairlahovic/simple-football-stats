import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DuplicatePlayersComponent } from './components/duplicate-players/duplicate-players.component';
import { SearchPlayersComponent } from './components/players/search-players/search-players.component';
import { EditPlayerComponent } from './components/players/edit-player/edit-player.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';

@NgModule({
  declarations: [
    AppComponent,
    DuplicatePlayersComponent,
    SearchPlayersComponent,
    EditPlayerComponent,
    CompetitionsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
