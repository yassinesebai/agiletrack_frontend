/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {
    //   const selectedProjectId = localStorage.getItem("projectID");
    //   if (!selectedProjectId) {
    //     console.log("no project selected !")
    //     this.router.navigateByUrl('pages/projects/choose_project');
    //  }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
