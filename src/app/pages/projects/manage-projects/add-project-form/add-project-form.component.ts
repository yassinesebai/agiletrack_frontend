import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../services/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.scss']
})
export class AddProjectFormComponent implements OnInit {
  myForm: FormGroup;
  @Input() project: any;
  @Input() mode: string;
  employeesList: any[];
  
  constructor(public windowRef: NbWindowRef, private fb: FormBuilder, private datePipe: DatePipe, private employeeService: EmployeeService, private projectService: ProjectService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.retrieveUsers();

    this.myForm = this.fb.group({
      name: '',
      start_date: '',
      estimated_end_date: '',
      employees: [],
      description: '',
      budget: '',
      is_completed: '',
    })

    if (this.mode === "edit") {
      let start_date = this.project.start_date ? new Date(this.project.start_date) : '';
      let end_date = this.project.estimated_end_date ? new Date(this.project.estimated_end_date) : '';
      let patch_values = {
        ...this.project,
        start_date: start_date,
        estimated_end_date: end_date,
      }
      const employeeIds = patch_values.employees.map(e => e.id.toString());
      patch_values.employees = employeeIds;
      this.myForm.patchValue(patch_values);
    }
  }

  close() {
    this.windowRef.close();
  }

  retrieveUsers() {
    this.employeeService.get_employees()
      .subscribe({
        next: (data) => {
          this.employeesList = data;
          console.log(data)
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

  calc_duration(enddate: Date, startdate: Date) {
    let diff = Math.abs(enddate.getTime() - startdate.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  //Projects CRUD
  addProject() {
    let data = this.myForm.value
    let start_date = new Date(data.start_date)
    let end_date = new Date(data.estimated_end_date)
    delete data.is_completed
    console.log(data.employees)
    data.estimated_duration = this.calc_duration(end_date, start_date)
    data.estimated_end_date = this.datePipe.transform(end_date, 'yyyy-MM-dd');
    data.start_date = this.datePipe.transform(start_date, 'yyyy-MM-dd');
    this.projectService.add_project(data).subscribe({
      next: () => {
        this.myForm.reset();
        this.close();
        this.showToast("success", "Added !", "Project added successfully")
      },
      error: (e) => console.error(e)
    });
  }

  updateProject() {
    // const updatedProject = {
    //   ...this.project,
    //   ...this.myForm.value
    // };
    const updatedProject = {
      ...this.myForm.value,
      id: this.project.id
    }
    let start_date = new Date(updatedProject.start_date)
    let end_date = new Date(updatedProject.estimated_end_date)
    updatedProject.estimated_duration = this.calc_duration(end_date, start_date)
    updatedProject.estimated_end_date = this.datePipe.transform(end_date, 'yyyy-MM-dd');
    updatedProject.start_date = this.datePipe.transform(start_date, 'yyyy-MM-dd');

    //remove additional data i retreived from the backend for statistics
    // delete updatedProject.progress
    // delete updatedProject.done_tasks
    // delete updatedProject.total_tasks
    // delete updatedProject.remaining_days

    console.log(updatedProject)
    this.projectService.update_project(updatedProject).subscribe({
      next: () => {
        this.myForm.reset();
        this.close();
        this.showToast("success", "Edited !", "Project added successfully")
      },
      error: (e) => console.error(e)
    });
  }

  deleteProject() {
    this.projectService.delete_project(this.project.id).subscribe({
      next: (data) => {
        this.close();
        this.showToast("danger", "Deleted !", "Project deleted successfully")
      },
      error: (e) => console.error(e)
    });
  }

}
