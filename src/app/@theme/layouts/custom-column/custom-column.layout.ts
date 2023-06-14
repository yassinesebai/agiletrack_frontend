import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'ngx-custom-column-layout',
  styleUrls: ['./custom-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})

export class CustomColumnLayoutComponent {
  constructor() { }
}