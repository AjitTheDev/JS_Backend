import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHttpService } from '../../services/user-http.service';
import { DashboardHttpService } from '../../../dashboard/services/dashboard-http.service';
import { AuthService } from '../../../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  showAlert:boolean = false;
  

  loginForm=new FormGroup({
    userId:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  constructor(private _router:Router,
    private _userHttpService:UserHttpService,
    private _authService:AuthService,
    private _dashboardHttpService:DashboardHttpService,
  ){

  }

  ngOnInit(): void {
    this._dashboardHttpService.getUsers().subscribe(data => {
      if (data) {
        console.log('users', data)
      }
    })
  }

  onSignIn(){
    if(this.loginForm.valid){
      this._userHttpService.loginUser(this.loginForm.value).subscribe(data=>{
          if(data){
            this._authService.login('true', data.data);
          }
      })
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
