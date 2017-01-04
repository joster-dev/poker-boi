import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

declare var Phoenix: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private appService: AppService,
    private router: Router
  ) {}

  model: LoginModel = {
    name: '',
    title: ''
  }
  
  createGame(gameTitle, userName) {
    this.appService.createGame(gameTitle, userName)
      .then((gameId) => {
        this.router.navigate(['/game', gameId])
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

interface LoginModel {
  name: string
  title: string
}