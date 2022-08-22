import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]) //Validators.pattern("[a-zA-Z]*"),
  });
  constructor(
    private servelogin: LoginService
  ) { }

  ngOnInit() {
    this.onForm();
  }

  onForm() {
    this.form.get("email")?.valueChanges.subscribe(val => {
      console.log("oie", val)
    })
  }

  _login() {
    // this.servelogin.credencial =  {UserName: "", Password:""};
    this.servelogin.credencial = this.form.getRawValue();
    this.servelogin.login()
    console.log("login");
  }
}