import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../core/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,
    
    MaterialModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterComponent {
  showAlert:boolean = false;
  registerForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    username:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required]),
  })

  constructor(private _router:Router){

  }

  onRegister(){
    if(this.registerForm.valid){

    }else{
      this.showAlert = true;
    }
    
  }
  closeAlert(){
    this.showAlert = false;
  }

  onLogin(){
    this._router.navigate(['/login'])
  }
}
