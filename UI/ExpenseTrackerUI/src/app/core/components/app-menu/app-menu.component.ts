import { Component, OnInit } from '@angular/core';
import { DashboardHttpService } from '../../../module/dashboard/services/dashboard-http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent implements OnInit{
  selectedMenu: string = 'dashboard'; // Default selected menu
  userDetails:any;
  constructor(private _dashboardHttpService:DashboardHttpService,
    private _authService:AuthService,
    private _router:Router
  ){
  }


  ngOnInit(): void {
    let userDetails = localStorage.getItem('userDetails');

    if (userDetails) {
      this.userDetails = JSON.parse(userDetails);
    }
  }



  logOut(){
    this._dashboardHttpService.logOut().subscribe(data => {
      if (data) {
        this._authService.logout();
      }
    })
  }

}
