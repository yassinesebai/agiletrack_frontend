import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { AddTaskFormComponent } from '../../../backlog/add-task-form/add-task-form.component';
import { Task } from '../../../models/task.model';
import { BacklogService } from '../../../services/backlog.service';
import { SprintService } from '../../../services/sprint.service';
import { TasksListComponent } from '../../tasks-list/tasks-list.component';

@Component({
  selector: 'ngx-sprint-tasks-list',
  templateUrl: './sprint-tasks-list.component.html',
  styleUrls: ['./sprint-tasks-list.component.scss']
})
export class SprintTasksListComponent implements OnInit {
  tasks: Task[];
  other_tasks: Task[];
  @Input() sprint_id: number;
  @Input() sprintStatus: string;
  @Input() user: any;
  project_id: number;

  constructor(private windowService: NbWindowService, private route: ActivatedRoute, private sprintService: SprintService, private backlogService: BacklogService) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params['id'];
    this.retrieveSprintTasks(this.sprint_id);
    this.retrieveBacklogTasks(this.project_id);
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  retrieveSprintTasks(sprint_id: number) {
    this.sprintService.get_sprint_tasks(sprint_id)
      .subscribe({
        next: (data) => {
          this.tasks = data
        },
        error: (e) => console.error(e)
      });
  }

  retrieveBacklogTasks(id: number) {
    this.backlogService.get_backlogTasks(id)
    .subscribe({
      next: (data) => {
        this.other_tasks = data;
      },
      error: (e) => console.error(e)
    });
  }

  openTasks() {
    const windowRef = this.windowService.open(TasksListComponent, {
      title: `🎯 Add tasks`, buttons: this.buttonsConfig, context: {
        mode: 'add',
        tasks: this.other_tasks,
        sprint_id: this.sprint_id,
      }
    });
    windowRef.onClose.subscribe(() => {
      this.retrieveSprintTasks(this.sprint_id);
      this.retrieveBacklogTasks(this.project_id);
    });
  }

  openEditTaskForm(task: Task) {
    const windowRef = this.windowService.open(AddTaskFormComponent, {
      title: `✏️ Edit task`, buttons: this.buttonsConfig, context: {
        task: task,
        mode: 'edit',
        assigned: true,
        id: this.project_id
      }
    });
    windowRef.onClose.subscribe(() => this.retrieveSprintTasks(this.sprint_id));
  }

  dropTask(task: Task) {
    task.sprint = null
    task.employee = null
    task.status = "todo"
    this.backlogService.update_task(task).subscribe({
      next: (data) => {
        this.retrieveSprintTasks(this.sprint_id);
        this.retrieveBacklogTasks(this.project_id);
      },
      error: (e) => console.error(e)
    });
  }
}
