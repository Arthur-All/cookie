import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { listModel } from 'src/app/model/listModel';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class listComponent implements OnInit {
  listFood:listModel[]=[];
  hide=true;
  form =  new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    
  });
  constructor(
    private listService:ListService,
    private model:listModel
  ) { }

  ngOnInit() {
    this.onForm();
    //this.listService.listModel =  {Id: '', FoodName:""};
    this.listService.get();
  }

  onForm(){
    this.form.get("email")?.valueChanges.subscribe(val=>{
      console.log("oie",val)
    })
  } 
  
}