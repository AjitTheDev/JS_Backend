import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-history',
  templateUrl: './recent-history.component.html',
  styleUrl: './recent-history.component.scss'
})
export class RecentHistoryComponent {
  @Input() recentTransactions:any;
}
