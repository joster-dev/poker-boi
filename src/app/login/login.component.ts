import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var Phoenix: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel = {
    name: '',
    uuid: ''
  }
  game_state: any = {}
  socket: any
  game_uuid: any
  password: any
  
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.socket = new Phoenix.Socket('ws://localhost:4000/socket');
    this.socket.connect();
  }
  
  create_game(username) {
    let promise = new Promise((resolve, reject) => {
      let channel = this.socket.channel('game:lobby')

      channel.join()
        .receive('ok', messages => console.log("joined lobby", messages))
        .receive('error', reason => reject(reason))

      channel.push('create', {name: username})
      channel.on('created', game => {
        this.game_uuid = game.uuid
        this.password = game.password
        channel.leave()
        resolve()
      })
    })
    .then(() => {
      this.start_game(this.game_uuid, username)
    })
  }

  start_game(uuid, username) {
    return new Promise((resolve, reject) => {
      let game = this.socket.channel('game:' + uuid, {name: username})

      game.join()
        .receive('error', reason => reject(reason))

      game.on('game_update', state => this.game_state = state.state)

      let intervalCount = 0
      let interval = setInterval(() => {
        if(game.state == 'joined') {
          clearInterval(interval)
          resolve(game)
        }
        else if(intervalCount++ > 100) {
          clearInterval(interval)
          reject('failed to connect to game')
        }
      }, 10)
    })
    .then((game) => {
      this.router.navigate(['game', game]);
    })
  }
}

interface LoginModel {
  name: string
  uuid: string
}