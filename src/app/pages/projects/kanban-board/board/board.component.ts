import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../auth/services/auth.service';
import { AddTaskFormComponent } from '../../backlog/add-task-form/add-task-form.component';
import { Task } from '../../models/task.model';
import { BacklogService } from '../../services/backlog.service';
import { SprintService } from '../../services/sprint.service';

export class Column {
  constructor(public name: string, public id: string, public tasks: Task[]) { }
}

export class Board {
  constructor(public name: string, public columns: Column[]) { }
}

@Component({
  selector: 'ngx-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  todo_tasks: Task[];
  inprogress_tasks: Task[];
  done_tasks: Task[];
  project_id: any;
  current_sprint: number | null;
  IDs: string[];
  user: any;
  searchText = '';
  
  public board: Board = new Board('Kanban Board', []);

  constructor(private windowService: NbWindowService, private router: Router, private authService: AuthService, private sprintService: SprintService, private route: ActivatedRoute, private backlogService: BacklogService) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.params['id'];
    if (this.project_id === 'null') {
      this.router.navigate(["projects/choose_project"]);
    } else {
      this.authService.user.subscribe((user) => {
        this.user = user;
      });
      this.get_active_sprint(this.project_id);
    }
  }

  add(checked: boolean) {
    this.retrieveSprintTasks(this.current_sprint, checked);
  }

  get_active_sprint(id: number): void {
    this.sprintService.get_active_sprint(id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.current_sprint = data;
          console.log(this.current_sprint)
          if (this.current_sprint !== null) {
            this.retrieveSprintTasks(this.current_sprint, false);
          }
        },
        error: (e: any) => console.error(e)
      });
  }

  retrieveSprintTasks(sprint_id: number, onlyMyTasks: boolean): void {
    this.sprintService.get_sprint_tasks(sprint_id)
      .subscribe({
        next: (data) => {
          console.log(data)
          if (onlyMyTasks) {
            data = data.filter(task => task.employee.id === this.user.id);
          }    
          this.todo_tasks = data.filter(task => task.status === 'todo')
          this.inprogress_tasks = data.filter(task => task.status === 'inprogress');
          this.done_tasks = data.filter(task => task.status === 'done');
          this.board.columns = [
            new Column('TO DO', '1', this.todo_tasks),
            new Column('IN PROGRESS', '2', this.inprogress_tasks),
            new Column('DONE', '3', this.done_tasks)
          ]
         this.IDs = [''+this.todo_tasks.length, ''+this.inprogress_tasks.length, ''+this.done_tasks.length]
        },
        error: (e) => console.error(e)
      });
  }

  public status_palette = {
    '1': 'todo',
    '2': 'inprogress',
    '3': 'done',
  }

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

        let updatedTask = {
          ...event.item.data,
          employee: event.item.data.employee.id,
          status: this.status_palette[event.container.id]
        }

        var today = new Date()
        if (updatedTask.status === "inprogress") {
          updatedTask.start_date = today;
        } else if (updatedTask.status === "done") {
          updatedTask.end_date = today;
        }

        this.backlogService.update_task(updatedTask).subscribe({
          next: (data) => {
            this.retrieveSprintTasks(this.current_sprint, false);
          },
          error: (e) => console.error(e)
        });
    }
  }

  openEditForm(task: Task) {
    const windowRef = this.windowService.open(AddTaskFormComponent, {
      title: `✏️ Edit task`, buttons: this.buttonsConfig, context: {
        task: task,
        mode: 'edit',
        assigned: true,
        id: this.project_id,
      }
    });
    windowRef.onClose.subscribe(() => this.retrieveSprintTasks(this.current_sprint, false));
  }
}