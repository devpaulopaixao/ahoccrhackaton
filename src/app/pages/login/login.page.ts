import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform : FormGroup;
  email = '';
  password = '';
  errorMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuth();

    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
  }

  login(){
    this.authService
      .login(this.email, this.password)
      .then((data: any) => {
        if(data.token){
          //console.log('token encontrado')
          this.router.navigate(["/", "home"]);
        }else{
          this.errorMsg = data;
        }
        /*this.storage.get('AUTH_DATA').then((val) => {
          console.log(val);
        });*/

      });
  }

  checkAuth(){
    this.storage.get('AUTH_DATA').then((data: any) => {
      if(data.token)
      this.router.navigate(["/", "home"]);
    });
  }

}
