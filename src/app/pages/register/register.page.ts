import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerform : FormGroup;
  name = '';
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
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
  }

  register(){
    this.authService
      .login(this.email, this.password)
      .then((data: any) => {
        if(data.token){
          //console.log('token encontrado')
          this.router.navigate(["/", "home"]);
        }else{
          this.errorMsg = data;
        }
      });
  }

}
