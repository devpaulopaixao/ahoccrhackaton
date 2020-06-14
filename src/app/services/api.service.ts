import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { from } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { environment, API_URL } from "../../environments/environment";
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: any = {};
  private token: string = "";

  constructor(
    private storage: StorageService,
    private nativeHttp: HTTP
  ) { 
    this.headers = {
      "Content-Type": "application/json"
    };
    this.loadUserData();
  }

  async getData(route: string) {
    return new Promise(resolve => {
      let nativeCall = this.nativeHttp.get(API_URL + route, {
        token: this.token
      }, { 'Content-Type': 'application/json' });

      from(nativeCall).pipe(
      ).subscribe(data => {
        let retorno = JSON.parse(data.data);
        resolve(retorno);
      })
    })
  }

  loadUserData(){
    this.storage.get('AUTH_DATA').then((data: any) => {
      this.token = data.token;
    });
  }
}
