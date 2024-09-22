import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/user/user.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MaterialModule } from './core/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,

    CoreModule,
    UserModule,
    MaterialModule,
    RouterModule.forRoot(routes) 
    
  ]
})
export class AppModule { }
