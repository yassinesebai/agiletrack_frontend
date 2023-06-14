import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getMenuItems } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  projectId: string;
  menu: any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // console.log("route from pages");
    // console.log(this.route.firstChild.firstChild.firstChild);
    this.route.firstChild.firstChild.firstChild.paramMap.subscribe((params) => {
      // console.log("params from pages");
      // console.log(params.get('id'));
      this.projectId = params.get('id');
      this.menu = getMenuItems(this.projectId);
    });
  }
}
