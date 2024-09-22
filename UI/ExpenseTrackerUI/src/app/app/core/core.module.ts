import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   // AppMenuComponent
   RouterModule.forChild(userRoutes),

  ],
  exports:[
    //AppMenuComponent
  ]
})
export class CoreModule { }
