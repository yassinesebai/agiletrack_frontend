import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService, NbWindowControlButtonsConfig } from '@nebular/theme';
import { AuthService } from '../../../auth/services/auth.service';
import { AddTaskFormComponent } from '../backlog/add-task-form/add-task-form.component';
import { Sprint } from '../models/sprint.model';
import { SprintService } from '../services/sprint.service';
import { AddSprintFormComponent } from './add-sprint-form/add-sprint-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'ngx-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  project_id: any;
  currentSprint: Sprint;
  sprints: Sprint[];
  completed_sprints: Sprint[];
  user: any;

  constructor(private windowService: NbWindowService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private sprintService: SprintService) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params["id"]
    if (this.project_id === 'null') {
      this.router.navigate(["projects/choose_project"]);
    } else {
      this.authService.user.subscribe((user) => {
        this.user = user;
      });
      this.retrieveSprints(this.project_id)
    }
  }

  retrieveSprints(id: number): void {
    this.sprintService.get_sprints(id)
      .subscribe({
        next: (data) => {
          this.currentSprint = data.find(sprint => sprint.status === 'inprogress');
          this.sprints = data.filter(sprint => sprint.status === 'todo');
          this.completed_sprints = data.filter(sprint => sprint.status === 'completed');
        },
        error: (e) => console.error(e)
      });
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  openWindowForm() {
    const windowRef = this.windowService.open(AddSprintFormComponent, {
      title: `➕ Create a sprint`, buttons: this.buttonsConfig, context: {
        mode: 'add',
        id: this.project_id
      }
    });
    windowRef.onClose.subscribe(() => this.retrieveSprints(this.project_id));
  }
}
