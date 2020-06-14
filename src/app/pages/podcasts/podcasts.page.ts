import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})
export class PodcastsPage implements OnInit {

  dados: any = new Array();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getData('/podcasts').then(data => {
      this.dados = data;
      console.log(data);
    })
  }

  play(i){
    for(let x in this.dados){
      (x == i) ? (this.dados[x].playing = true) : (this.dados[x].playing = false);
    }
  }

}
