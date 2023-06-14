import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'ngx-recent-tasks',
  templateUrl: './recent-tasks.component.html',
  styleUrls: ['./recent-tasks.component.scss']
})
export class RecentTasksComponent implements OnInit {
  latest_tasks: Task[];
  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveLatestTasks(this.route.snapshot.params["id"])
  }

  retrieveLatestTasks(id: number): void {
    this.projectService.get_latest_tasks(id)
      .subscribe({
        next: (data) => {
          this.latest_tasks = data;
        },
        error: (e) => console.error(e)
      });
    }
}
