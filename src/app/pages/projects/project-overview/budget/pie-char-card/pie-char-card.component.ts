import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pie-char-card',
  templateUrl: './pie-char-card.component.html',
  styleUrls: ['./pie-char-card.component.scss']
})
export class PieCharCardComponent implements OnInit {
  @Input() expenses: number;
  @Input() remaining: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
