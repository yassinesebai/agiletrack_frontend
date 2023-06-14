import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-auth',
  template: `
    <ngx-custom-column-layout>
      <router-outlet></router-outlet>
    </ngx-custom-column-layout>
  `,
})
export class AuthComponent implements OnInit {
  projectId: string;
  menu: any;
  constructor() {}
  ngOnInit(): void {
    // console.log("route from pages");
    // console.log(this.route.firstChild.firstChild.firstChild);
    // this.route.firstChild.firstChild.firstChild.paramMap.subscribe((params) => {
    //   console.log("params from pages");
    //   console.log(params.get('id'));
    //   this.projectId = params.get('id');
    //   this.menu = getMenuItems(this.projectId);
    // });
  }
}
