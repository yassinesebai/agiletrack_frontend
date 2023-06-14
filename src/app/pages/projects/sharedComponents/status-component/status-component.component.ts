import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-status-component',
  templateUrl: './status-component.component.html',
  styleUrls: ['./status-component.component.scss']
})
export class StatusComponentComponent implements OnInit {
  @Input() status: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
