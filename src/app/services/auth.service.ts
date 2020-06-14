import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HTTP } from "@ionic-native/http/ngx";
import { from } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { environment, API_URL } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);
  private headers: any = {};

  globalUserData = {
    token: null,
    name: null,
    email: null,
    avatar_blob: null    
  };

  constructor(
    private storage: StorageService,
    private nativeHttp: HTTP
  ) {
    this.headers = {
      "Content-Type": "application/json"
    };
  }

  async login(email, password){

    return new Promise(resolve => {

      let nativeCall = this.nativeHttp.post(
        API_URL + "/authenticate",
        {
          email: email,
          password: password
        },
        this.headers
      );

      from(nativeCall)
        .pipe()
        .subscribe(
          data => {
            //AWAYS PERFORM ON STATUS 200
            //console.log("SUCCESS->" + JSON.stringify(data.data));
            let retorno = JSON.parse(data.data);
            //console.log(retorno.token);

            this.globalUserData.token = retorno.token;
            this.globalUserData.name = retorno.user.name;
            this.globalUserData.email = retorno.user.email;
            this.globalUserData.avatar_blob = retorno.user.avatar_blob;
            
            this.storage.set("AUTH_DATA", this.globalUserData);
            this.authState.next(true);

            resolve(retorno);
          },
          error => {
            //START ERROR HANDLING
            let w_return = JSON.parse(error.error);
            console.log('Erro: ' + w_return)
            resolve(w_return.error);
            //END ERROR HANDLING
          }
        );

    });

  }
}
