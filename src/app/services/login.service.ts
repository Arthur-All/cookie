import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_PATH } from 'src/environments/environment';
import { token } from '../model/AuthenticatedResponse';
import { listModel } from '../model/listModel';
import { loginModel } from '../model/loginModel';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public credencial: loginModel
  
  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }
 
   
  login(){
      this.http.post<token>("https://localhost:7006/api/auth/login",this.credencial,{
        headers: 
                new HttpHeaders({"Content-Type":"application/json"})
      }).subscribe({
        next: (resp: token)=>{
          let {token} = resp
          localStorage.setItem("jwt",token);
          this.router.navigate(["/list"])
        }
      })
    
  }
}


