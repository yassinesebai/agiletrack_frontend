import { Component, Input, OnInit } from '@angular/core';
import { NbWindowRef, patch } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SprintService } from '../../services/sprint.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-add-sprint-form',
  templateUrl: './add-sprint-form.component.html',
  styleUrls: ['./add-sprint-form.component.scss']
})
export class AddSprintFormComponent implements OnInit {
  myForm: FormGroup;

  @Input() sprint: any;
  @Input() mode: string;
  @Input() showdate: boolean;
  @Input() start: boolean;
  @Input() finish: boolean;
  @Input() id: number;

  constructor(public windowRef: NbWindowRef, private fb: FormBuilder, private sprintService: SprintService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: '',
      estimated_end_date: '',
      goal: '',
    })

    if (this.mode === "edit") {
      let est_date = this.sprint.estimated_end_date ? new Date(this.sprint.estimated_end_date) : '';
      let patch_values = {
        ...this.sprint,
        estimated_end_date: est_date,
      }
      this.myForm.patchValue(patch_values);
    }
  }
  close() {
    this.windowRef.close();
  }

  addSprint() {
    let data = this.myForm.value
    data.project = this.id;
    if (this.mode !='edit' || !this.showdate) {
      delete data['estimated_end_date']
    }
    this.sprintService.add_sprint(data).subscribe({
      next: () => {
        this.myForm.reset();
        this.close();
      },
      error: (e) => console.error(e)
    });
  }

  calc_duration(enddate: Date, startdate: Date) {
    let diff = Math.abs(enddate.getTime() - startdate.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  updateSprint(action: string) {
    const updatedSprint = {
      ...this.sprint,
      ...this.myForm.value
    };
    var today = new Date()
    var est_enddate = new Date(updatedSprint.estimated_end_date)
    var start_date = new Date(updatedSprint.start_date)
    if (action === 'start') {
      updatedSprint.status = "inprogress"
      updatedSprint.estimated_duration = this.calc_duration(est_enddate, today)
      updatedSprint.start_date = this.datePipe.transform(today, 'yyyy-MM-dd');
    } else if (action == 'update' && this.showdate) {
      updatedSprint.estimated_duration = this.calc_duration(est_enddate, start_date)
    } else if (action === 'finish') {
      updatedSprint.status = "completed"
      updatedSprint.duration = this.calc_duration(today, start_date)
      updatedSprint.end_date = this.datePipe.transform(today, 'yyyy-MM-dd');
    }
    if (this.showdate) {
      updatedSprint.estimated_end_date = this.datePipe.transform(est_enddate, 'yyyy-MM-dd');
    } else {
      delete updatedSprint.estimated_end_date;
    }
    this.sprintService.update_sprint(updatedSprint).subscribe({
      next: (data) => {
        console.log(data)
        this.close();
      },
      error: (e) => console.error(e)
    });
  }

  startSprint() {
    this.updateSprint("start")
  }

  finishSprint() {
    this.updateSprint("finish")
  }

  deleteSprint() {
    this.sprintService.delete_sprint(this.sprint.id).subscribe({
      next: (data) => {
        this.close();
        console.log(data)
      },
      error: (e) => console.error(e)
    });
  }

}
