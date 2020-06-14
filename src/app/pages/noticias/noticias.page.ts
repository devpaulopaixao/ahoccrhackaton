import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  dados: any = new Array();

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getData('/noticias').then(data => {
      this.dados = data;
      console.log(data);
    })
    console.log(this.dados)
  }

}
