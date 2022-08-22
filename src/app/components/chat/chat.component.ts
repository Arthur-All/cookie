import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  connection: HubConnection;
  
  constructor(
    private jwtHelper: JwtHelperService
    ) 
    {
    this.connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7006/chat")
    .build();

    }
    

  ngOnInit() {
    this.connection.start().then(function(){
      console.log("SignalR Connected")
    })
  }
}
  
  
  
  




