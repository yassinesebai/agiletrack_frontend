import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'ngx-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {
  @Input() project: Project;
  remaining: number = 20;
  status: string = "inprogress";
  
  constructor() { }

  ngOnInit(): void { 
    this.status = this.project.is_completed ? 'completed' : 'inprogress';
  }
}
