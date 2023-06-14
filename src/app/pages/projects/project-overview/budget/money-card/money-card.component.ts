import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-money-card',
  templateUrl: './money-card.component.html',
  styleUrls: ['./money-card.component.scss']
})
export class MoneyCardComponent implements OnInit {
  @Input() card: any;
  constructor() { }

  ngOnInit(): void {
  }

}
