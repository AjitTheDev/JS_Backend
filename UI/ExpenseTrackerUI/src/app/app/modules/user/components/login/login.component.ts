import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showAlert:boolean = false;
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  constructor(private _router:Router){

  }

  onSignIn(){
    if(this.loginForm.valid){

    }else{
      this.showAlert = true;
    }
    
  }
  closeAlert(){
    this.showAlert = false;
  }

  onRegister(){
    this._router.navigate(['/register'])
  }

}
