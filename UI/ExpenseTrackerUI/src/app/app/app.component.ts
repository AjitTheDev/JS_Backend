import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppMenuComponent } from './core/app-menu/app-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppMenuComponent,CommonModule    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUI';

  isAuthorized:boolean=false

  constructor(private _router:Router){

  }

  ngOnInit(): void {
      if(this.isAuthorized){
        this._router.navigate(['/login'])
      }
  }
}
