import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_PATH } from 'src/environments/environment';
import { listModel } from '../model/listModel';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http:HttpClient,
    private model:listModel
  ) { }

  get(){
    const token = localStorage.getItem('token');
    this.http.get<listModel>(`${API_PATH}foodlist`,{
      headers:{
        Authrization:`Bearer ${token}`
      }
    });
  }


}


