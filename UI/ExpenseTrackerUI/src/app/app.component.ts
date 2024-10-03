import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUI';
  isAuthorized:string | null='';

  

  constructor(
    private _router:Router,
  ){}

  ngOnInit(): void {
  this.isAuthorized = localStorage.getItem('isAuthorized')
    if(this.isAuthorized!=='true'){
      this._router.navigate(['/login']);
    }
  }

}
