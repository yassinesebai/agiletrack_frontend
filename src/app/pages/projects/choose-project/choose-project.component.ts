import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'ngx-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.scss']
})
export class ChooseProjectComponent implements OnInit {
  projects?: Project[];
  user: any;

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.retrieveProjects(this.user.id);
  }

  retrieveProjects(user_id: number): void {
    this.projectService.get_user_projects(user_id)
      .subscribe({
        next: (data) => {
          this.projects = data;
        },
        error: (e) => console.error(e)
      });
  }

}
