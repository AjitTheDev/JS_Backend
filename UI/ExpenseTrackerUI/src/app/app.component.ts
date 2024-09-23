import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUI';
  isAuthorized:boolean=false;

  constructor(private _router:Router){}

  ngOnInit(): void {
    if(!this.isAuthorized){
      this._router.navigate(['/login']);
    }
  }

}
