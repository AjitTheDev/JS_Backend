import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrl: './total-expense.component.scss'
})
export class TotalExpenseComponent {
  @Input() totalUserExpense:number =0;
}
