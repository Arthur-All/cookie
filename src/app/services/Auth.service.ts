import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { token } from '../model/AuthenticatedResponse';
import { listModel } from '../model/listModel';
import { loginModel } from '../model/loginModel';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  credencial: loginModel = { email: '', password: '' };
  invalidLogin: boolean;
  list = new listModel();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  login() {
    this.http.post<token>("https://localhost:7006/api/auth/login", this.credencial, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (resp: token) => {
        let { token } = resp
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/list"])
      }
    })

  }
}


