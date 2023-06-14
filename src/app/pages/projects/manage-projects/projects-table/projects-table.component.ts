import { Component, OnInit } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../auth/services/auth.service';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';

@Component({
  selector: 'ngx-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {
  projects: Project[];
  user: any;

  constructor(private windowService: NbWindowService, private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.retrieveProjects(this.user.id);
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  openEditWindowForm(project: Project) {
    const windowRef = this.windowService.open(AddProjectFormComponent, { title: `➕ Edit Project`, buttons: this.buttonsConfig, context: {
      mode: 'edit',
      project: project,
    }});
    windowRef.onClose.subscribe(() => this.retrieveProjects(this.user.id));
  }

  retrieveProjects(user_id: number) {
    this.projectService.get_user_projects(user_id)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.projects = data;
      },
      error: (e) => console.error(e)
    })
  }

}