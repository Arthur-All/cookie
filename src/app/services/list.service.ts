import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { listModel } from '../model/listModel';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    let token = localStorage.getItem('token');
    return this.http.get<listModel>(`${API_PATH}foodlist`, {
      headers: {
        Authrization: `Bearer ${token}`
      }
    });
  }

  updateList(food: listModel) {
    let token = localStorage.getItem('token');
    return this.http.put<listModel[]>(`${API_PATH}update`, food, {
      headers: {
        Authrization: `Bearer ${token}`
      }
    });
  }

  createItem(food: listModel) {
    let token = localStorage.getItem('token');
    return this.http.post<listModel[]>(`${API_PATH}post`, food, {
      headers: {
        Authrization: `Bearer ${token}`
      }
    });
  }

  deleteItem(food: listModel) {
    let token = localStorage.getItem('token');
    return this.http.delete<listModel[]>(`${API_PATH}${food.id}`, {
      headers: {
        Authrization: `Bearer ${token}`
      }
    });
  }
}


