import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './game/join/join.component';
import { VoteComponent } from './game/vote/vote.component';
import { AdminComponent } from './game/admin/admin.component';
import { StageComponent } from './game/stage/stage.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game/:gameId', component: GameComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    JoinComponent,
    VoteComponent,
    AdminComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
