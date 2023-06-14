import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @Input() budget: number;
  @Input() cost: number;
  remaining: number;
  
  public cards = []

  constructor() { }

  ngOnInit(): void {
    this.remaining = this.budget - this.cost;
    this.cards = [
      {
        img: "assets/images/wallet.png",
        title: "PROJECT'S BUDGET",
        amount: this.budget,
      },
      {
        img: "assets/images/expenses.png",
        title: "TOTAL EXPENSES",
        amount: this.cost,
      },
      {
        img: "assets/images/remaining.png",
        title: "REMAINING BUDGET",
        amount: this.remaining,
      }
    ]
  }
}
