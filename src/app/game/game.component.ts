import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

declare var Phoenix: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(
    private appService: AppService
  ) { }

  voteOptions
  ngOnInit() {
    this.appService.getVoteOptions()
      .then((voteOptions) => {
        this.voteOptions = voteOptions
        console.log(this.voteOptions)
      })
      .catch((error) => console.log(error))
  }
}