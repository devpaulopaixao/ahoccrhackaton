import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  dados: any = new Array();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getData('/videos').then(data => {
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
