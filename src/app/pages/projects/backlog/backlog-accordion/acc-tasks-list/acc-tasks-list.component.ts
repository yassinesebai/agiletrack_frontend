import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService, NbWindowControlButtonsConfig } from '@nebular/theme';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Task } from '../../../models/task.model';
import { BacklogService } from '../../../services/backlog.service';
import { AddTaskFormComponent } from '../../add-task-form/add-task-form.component';

@Component({
  selector: 'ngx-acc-tasks-list',
  templateUrl: './acc-tasks-list.component.html',
  styleUrls: ['./acc-tasks-list.component.scss']
})
export class AccTasksListComponent implements OnInit {
  tasks: Task[];
  sprints_list: any;
  project_id: any;
  user: any;

  constructor(private windowService: NbWindowService, private router: Router, private authService: AuthService, private backlogService: BacklogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params["id"];
    if (this.project_id === 'null') {
      this.router.navigate(["projects/choose_project"]);
    } else {
      this.authService.user.subscribe((user) => {
        this.user = user;
      });
      this.retrieveTasks(this.project_id)
    }
  }

  retrieveTasks(id: number): void {
    this.backlogService.get_backlogTasks(id)
      .subscribe({
        next: (data) => {
          this.tasks = data;
        },
        error: (e) => console.error(e)
      });
    this.backlogService.get_sprintsList(id)
      .subscribe({
        next: (data: any) => {
          this.sprints_list = data;
        },
        error: (e: any) => console.error(e)
      });
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  openWindowForm() {
    const windowRef = this.windowService.open(AddTaskFormComponent, {
      title: `➕ Create a task`, buttons: this.buttonsConfig, context: {
        mode: 'add',
        id: this.project_id,
      }
    });
    windowRef.onClose.subscribe(() => this.retrieveTasks(this.project_id));
  }

  openEditForm(task: Task) {
    const windowRef = this.windowService.open(AddTaskFormComponent, {
      title: `✏️ Edit task`, buttons: this.buttonsConfig, context: {
        task: task,
        mode: 'edit',
        assigned: false,
      }
    });
    windowRef.onClose.subscribe(() => this.retrieveTasks(this.project_id));
  }

  onChange($event: any, task: Task) {
    task.sprint = $event;
    this.backlogService.update_task(task).subscribe({
      next: () => {
        this.retrieveTasks(this.project_id)
      },
      error: (e) => console.error(e)
    });
  }
}