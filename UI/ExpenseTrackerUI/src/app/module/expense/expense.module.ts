import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense/expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    //added here too
    ReactiveFormsModule, //added here too
    CoreModule,
  ]
})
export class ExpenseModule { }
