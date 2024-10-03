import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHttpService } from '../../services/user-http.service';
import { DashboardHttpService } from '../../../dashboard/services/dashboard-http.service';

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
            localStorage.setItem('isAuthorized','true')
            localStorage.setItem('userDetails', JSON.stringify(data.data));
            this._router.navigate(['/dashboard'])
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
