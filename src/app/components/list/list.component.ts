import { Component, OnInit } from '@angular/core';
import { listModel } from 'src/app/model/listModel';
import { ListService } from 'src/app/services/list.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class listComponent implements OnInit {
  listFood: listModel;
  foodToEdit?: listModel;
  hide = true;
  connection: HubConnection;

  constructor(
    private listService: ListService,
    private _snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7006/chat")
      .build();

  }

  ngOnInit() {
    this.connection.start().then(function () {
      console.log("SignalR Connected")
    });

    this.msg();

    let token = localStorage.getItem("token") ?? "";

    this.listService.get()
      .subscribe((resp: listModel) => {
        this.listFood = resp;
      })
  }
  msg() {
    this.connection.on('Send', (resp: any) => {
      alert(resp)
      console.log(resp);
    })
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
  newFood() {
    this.foodToEdit = new listModel();
  }

  editFood(food: listModel) {
    this.foodToEdit = food;
  }

  updateFoodList(foods: listModel) {
    this.listFood = foods;
  }

  openSnackBar() {
    this._snackBar.open("...");
  }

}