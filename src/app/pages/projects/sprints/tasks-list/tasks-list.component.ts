import { Component, Input, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Task } from '../../models/task.model';
import { BacklogService } from '../../services/backlog.service';

@Component({
  selector: 'ngx-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() sprint_id;
  
  constructor(public windowRef: NbWindowRef, private backlogService: BacklogService) { }

  ngOnInit(): void {
  }

  checked_tasks: Task[] = [];

  close() {
    this.windowRef.close();
  }

  add(checked: boolean, task: Task) {
    if (checked) {
      this.checked_tasks.push(task);
    } else {
      this.checked_tasks = this.checked_tasks.filter((t) => t.id !== task.id);
    }
    console.log(this.checked_tasks)
  }

  assign_task(task: Task) {
    task.sprint = this.sprint_id;
    console.log(task)
    console.log(task)
    this.backlogService.update_task(task).subscribe({
      next: (data) => {
        console.log(data)
        this.close()
      },
      error: (e) => console.error(e)
    });
  }

  assign_tasks() {
    this.checked_tasks.forEach((task) => {
      this.assign_task(task)
    })
  }

}
