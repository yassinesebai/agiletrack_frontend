import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'ngx-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  project: Project;
  project_id: any;
  
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params["id"];
    if (this.project_id === 'null') {
      this.router.navigate(["projects/choose_project"]);
    } else {
      this.retrieveProject(this.project_id)
    }
  }

  retrieveProject(id: number): void {
  this.projectService.get_project(id)
    .subscribe({
      next: (data) => {
        this.project = data;
        console.log(this.project)
      },
      error: (e) => console.error(e)
    });
  }

}
