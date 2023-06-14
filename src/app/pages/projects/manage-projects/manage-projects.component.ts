import { Component, OnInit, ViewChild } from '@angular/core';
import { NbWindowService, NbWindowControlButtonsConfig } from '@nebular/theme';
import { AuthService } from '../../../auth/services/auth.service';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';

@Component({
  selector: 'ngx-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {
  @ViewChild('childComponent') childComponent!: ProjectsTableComponent;
  user: any;

  constructor(private windowService: NbWindowService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  openWindowForm() {
    const windowRef = this.windowService.open(AddProjectFormComponent, { title: `➕ New Project`, buttons: this.buttonsConfig, context: {
      mode: 'add'
    }});
    windowRef.onClose.subscribe(() => this.childComponent.retrieveProjects(this.user.id));

  }
}