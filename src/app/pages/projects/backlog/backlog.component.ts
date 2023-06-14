import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  project_id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params["id"];
  }
}
