import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-bar-chart-card',
  templateUrl: './bar-chart-card.component.html',
  styleUrls: ['./bar-chart-card.component.scss']
})
export class BarChartCardComponent implements OnInit {
  @Input() budget: number;
  @Input() expenses: number;
  @Input() remaining: number;

  constructor() { }

  ngOnInit(): void {
  }

}
