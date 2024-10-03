import { Component, OnInit } from '@angular/core';
import { DashboardHttpService } from '../../../module/dashboard/services/dashboard-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent implements OnInit{
  selectedMenu: string = 'dashboard'; // Default selected menu
  userDetails:any;
  constructor(private _dashboardHttpService:DashboardHttpService,
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
        localStorage.removeItem('isAuthorized'); // Clear only the isAuthorized item
     // this.isAuthorized = 'false'; // Update the local component state
      this._router.navigate(['/login']); // Redirect to login
      }
    })
  }

}
