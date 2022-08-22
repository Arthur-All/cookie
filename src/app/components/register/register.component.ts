import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  score = 0;

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl({ disabled: true, value: '' }, [Validators.required])
  });

  constructor(
  ) { }

  async ngOnInit(): Promise<void> {
    this.onForm()
  }

  onForm() {
    this.form.get("password")?.valueChanges.subscribe((val) => {
      if (val)
        if (this.form.get("cPassword")?.disabled)
          this.form.get("cPassword")?.enable();
      this.register();
      this.score = this.passwordScore(val)

    });
    combineLatest([
      this.form.get("password")?.valueChanges,
      this.form.get("cPassword")?.valueChanges
    ]).subscribe(val => {
      console.log(val)
      this.checker(val);
      this.passwordScore
    })
  }

  checker([password, cPassword]) {
    console.log(password, cPassword)
    if (password != cPassword) {
      this.form.get("cPassword").setErrors({
        different: true
      })
    } else {
      this.form.get("cPassword").setErrors(null)
    }
  }

  passwordScore(password: string) {
    let n = 0;
    if (!password) return n;

    if (password.match(/[^\w\*]/)) n += 34; //char especial
    if (password.match(/^.{6,}$/)) n += 33;  // tamanho
    if (password.match(/\d/)) n += 33; //ve se tem numeros

    return n;
  }

  register() {
    //if(this.checker==invalied)
  }

}


/*line 61...if(this._password!=this.cPassword){
     //return this.cPassword.invalid  && console.log("diferent")
     this.checker =
   }
  return this.cPassword.valid && console.log("valido")*/


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