import { Component, OnInit } from '@angular/core';

declare var Phoenix: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  options = [
    {
      name: 'Fibonacci',
      value: [
        1,2,3,5,8,13,21,34,55,89,'?','Pass', '!'
      ]
    }
  ]

  socket: any;
  ngOnInit() {
    this.socket = new Phoenix.Socket('/socket');
    this.socket.connect();
  }

  create_game(game_name, user_name) {
    return new Promise( (resolve, reject) => {
      let channel = this.socket.channel('game:lobby')

      channel.join()
        .receive('ok', messages => console.log(messages))
        .receive('error', reason => console.error(reason))
    })
  }

}

// var PokerBoy = (function () {
//   var socket,
//   game_uuid,
//   password,
//   game;
  
//   return {
//     init: init,
//     create_game: create_game
//   };

//   function init(){
//     socket = new Phoenix.Socket('/socket');
//     socket.connect();
//   }

//   function create_game(game_name, user_name){
//     return new Promise(function(resolve, reject){
//       var channel = socket.channel("game:lobby")
//       channel.join()
//         .receive("ok", messages => console.log("joined lobby", messages) )
//         .receive("error", reason => reject(reason) );

//       channel.push('create', {name: name});
//       channel.on('created', game => {
//         game_uuid = game.uuid;
//         password = game.password;
//         channel.leave();
//         resolve();
//       });
//     })
//     .then(function(){
//       return new Game(game_uuid, user_name);
//     });
//   }

//   function Game(game_uuid, username){
//     var self = this;
//     var game;

//     this.become_admin = become_admin;
//     this.vote = vote;

//     //runs on new to return promise which resovles with game object
//     return new Promise(function(resolve, reject){
//       game = socket.channel("game:"+game_uuid, {name: username});

//       game.join()
//         .receive("ok", message => console.log("joined game", message) )
//         .receive("error", reason => reject(reason) );

//       game.on("game_update", state => update(state.state) );

//       var intervalCount = 0;
//       var interval = setInterval(function(){
//         if(game.state == "joined"){
//           clearInterval(interval);
//           resolve(self);
//         }
//         else if(intervalCount++ > 100){
//           clearInterval(interval);
//           reject("failed to connect to game");
//         }
//       }, 10);
//     });

//     function vote(vote){
//       game.push('user_vote', {vote: vote});
//     }

//     function become_admin(password){
//       game.push('become_admin', {password: password});
//     }

//     function user_promote(user_name){
//       game.push('user_promote', {user: user_name});
//     }

//     function toggle_playing(user_name){
//       game.push('toggle_playing', {user: user_name});
//     }

//     function update(state){
//         debugger;
//     }
//   }
// })();