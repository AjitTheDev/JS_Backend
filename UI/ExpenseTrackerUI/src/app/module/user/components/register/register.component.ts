import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHttpService } from '../../services/user-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  showAlert:boolean = false;

  registerForm=new FormGroup({
    userId:new FormControl('',[Validators.required]),
    userName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required])
  })

  constructor(private _router:Router,
    private _userHttpService:UserHttpService
  ){

  }


  onRegister(){
    if(this.registerForm.valid){
      this._userHttpService.registerUser(this.registerForm.value).subscribe(data=>{
        console.log(data, 'response')
      })
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
