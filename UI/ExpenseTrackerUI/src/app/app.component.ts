import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './core/services/auth-service/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUI';
  isAuthorized:boolean=false;

  

  constructor(
    private _router:Router,
    private _authService: AuthService
  ){}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthorized = isAuthenticated;
    });
  }

}
