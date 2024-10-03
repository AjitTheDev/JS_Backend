import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-income',
  templateUrl: './total-income.component.html',
  styleUrl: './total-income.component.scss'
})
export class TotalIncomeComponent {
  @Input() totalUserIncome:number =0;

}
