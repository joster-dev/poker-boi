import { Injectable } from '@angular/core';

declare var Phoenix: any;

@Injectable()
export class AppService {
  socket: any
  id: number
  password: number
  channel: any

  constructor() {
    this.socket = new Phoenix.Socket('wss://planning.falk.pw/socket');
    this.socket.connect();
  }

  public createGame(gameName, userName) {
    return new Promise((resolve, reject) => {
      let channel = this.socket.channel('game:lobby')

      channel.join()
        .receive('ok', messages => console.log('joined lobby', messages))
        .receive('error', reason => reject(reason))

      channel.push('create', {name: gameName})

      channel.on('created', game => {
        this.id = game.uuid
        this.password = game.password
        channel.leave()
        this.joinGame(userName, true)
        resolve(this.id)
      })
    })
  }

  public joinGame(userName, admin) {
    return new Promise((resolve, reject) => {
      this.channel = this.socket.channel('game:' + this.id, {name: userName})

      this.channel.join()
        .receive('ok', messages => console.log('joined game', messages))
        .receive('error', reason => reject(reason))

      let intervalCount = 0
      let interval = setInterval(() => {
        if(this.channel.state == 'joined') {
          clearInterval(interval)
          if(admin) {
            this.channel.push('become_admin', this.channel.password)
          }
          resolve()
        }
        else if(intervalCount++ > 100) {
          clearInterval(interval)
          reject('failed to connect to game')
        }
      }, 10)
    })
  }

  public getVoteOptions() {
    return new Promise((resolve, reject) => {
      this.channel.push('valid_votes')

      this.channel.on('valid_votes', store => {
        resolve(store.valid_votes)
      })

      setTimeout(() => {
        reject('request timed out')
      }, 100)
    })
    
    
  }
}
