import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbWindowRef } from '@nebular/theme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BacklogService } from '../../services/backlog.service';
import { ProjectService } from '../../services/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  myForm: FormGroup;

  @Input() task: any;
  @Input() mode: string;
  @Input() assigned: boolean;
  @Input() id: number;
  @Input() user: any;
  employeesList: any[];

  constructor(public windowRef: NbWindowRef, private fb: FormBuilder, private backlogService: BacklogService, private projectService: ProjectService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      summary: '',
      duration: '',
      priority: '',
      cost: '',
      status: '',
      employee: '',
      description: ''
    })

    if (this.mode === "edit") {
      let edited_task: any;
      edited_task = { ...this.task }
      if (this.task.employee !== null) {
        edited_task.employee = this.task.employee.id.toString()
      }
      console.log(edited_task)
      this.myForm.patchValue(edited_task);
    }

    if (this.assigned) {
      this.retrieveTeamMembers(this.id);
    }
  }

  close() {
    this.windowRef.close();
  }

  retrieveTeamMembers(id: number) {
    this.projectService.get_team_members(id)
      .subscribe({
        next: (data) => {
          this.employeesList = data;
        },
        error: (e) => console.error(e)
      });
  }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }

  addTask() {
    let data = this.myForm.value
    data.project = this.id;
    data.employee = null; 
    delete data['status']
    this.backlogService.add_task(data).subscribe({
      next: () => {
        this.myForm.reset();
        this.close();
        this.showToast("success", "Added !", "Task added successfully")
      },
      error: (e) => console.error(e)
    });
  }

  updateTask() {
    const updatedTask = {
      ...this.task,
      ...this.myForm.value
    };
    var today = new Date()
    if (updatedTask.status === "inprogress") {
      updatedTask.start_date = today;
    } else if (updatedTask.status === "done") {
      updatedTask.end_date = today;
    }
    this.backlogService.update_task(updatedTask).subscribe({
      next: (data) => {
        console.log(data)
        this.close();
        this.showToast("success", "updated !", "Task Updated successfully")
      },
      error: (e) => console.error(e)
    });
  }

  deleteTask(id: number) {
    this.backlogService.delete_task(id).subscribe({
      next: (data) => {
        this.close();
        console.log(data)
        this.showToast("danger", "Deleted !", data.message)
      },
      error: (e) => console.error(e)
    });
  }
}
