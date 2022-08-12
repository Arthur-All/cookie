import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  score= 0;
  regex: RegExp

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl({ disabled: true, value: '' }, [Validators.required])
  });

  constructor(
    private router:Router,
    private _snackBar: MatSnackBar
    ) { }

  async ngOnInit(): Promise<void> {
    this.onForm()
  }

  onForm() {
    this.form.get("password")?.valueChanges.subscribe((val)=> {
      if(val)
        if(this.form.get("cPassword")?.disabled)
          this.form.get("cPassword")?.enable();
      this.register();
      this.score= this.passwordScore(val)

    });
    combineLatest([
      this.form.get("password")?.valueChanges,
      this.form.get("cPassword")?.valueChanges
    ]).subscribe(val=>{
     console.log(val)
      this.checker(val);
    })
  }

  checker([password,cPassword]){
   console.log(password,cPassword)
    if(password != cPassword){
      this.form.get("cPassword").setErrors({
        
        different:true
      }) 
    }else{
      this.form.get("cPassword").setErrors(null)
    }
    
    /*if(this._password!=this.cPassword){
      //return this.cPassword.invalid  && console.log("diferent")
      this.checker = 
    }
    return this.cPassword.valid && console.log("valido")*/
  }

  register(){
    //if(this.checker==invalied)
  }

  passwordScore(password:string){
    //let regex= {'/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/'}
    //let RegExp= {'/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/'}

    let strengthPassed=0;
    
    if(!password)return 0; 
      if(password.length >4){
        return 12;
      } else if(password.length>6){
        return 50;
      }
    return 0;
  }




} 




// const  rule = {
//   hasNumber:    password.match(/\d/)       ? true : false,
//   hasLowerCase: password.match(/[a-z]/)    ? true : false,
//   hasUpperCase: password.match(/[A-Z]/)    ? true : false,
//   isBigLength:  password.match(/^.{10,}$/) ? true : false,
//   specialChar:  password.match(/[^\w\*]/)  ? true : false
// } 


//conseito de tempo 
/*const p1 = () => new Promise((res, rej) => { //conseito de tempo 
  setTimeout(() => {
    const val = "OBA"
    console.log(val)
    res(val);
  }, 2000)
})

await p1();

console.log('hey')
// setTimeout(()=>{
//   // this.form.get("password")?.setErrors({"afgaf":true})
// },6000)*/