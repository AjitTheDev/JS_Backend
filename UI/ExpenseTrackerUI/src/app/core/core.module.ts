import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  providers:[
    HttpService
  ],
  exports:[
    AppMenuComponent
  ]
})
export class CoreModule { }
