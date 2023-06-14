import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { Sprint } from '../../models/sprint.model';
import { AddSprintFormComponent } from '../add-sprint-form/add-sprint-form.component';

@Component({
  selector: 'ngx-sprints-accordion',
  templateUrl: './sprints-accordion.component.html',
  styleUrls: ['./sprints-accordion.component.scss']
})
export class SprintsAccordionComponent implements OnInit {
  @Input() sprint: Sprint;
  @Input() user: any;
  @Output() sprintUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private windowService: NbWindowService) { }

  ngOnInit(): void {}

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  openEditForm($event, start: boolean, finish: boolean) {
    let action = start ? "Start" : (finish ? "Finish" : "Edit");
    let showdate = this.sprint.status == 'inprogress' || start;
    const windowRef = this.windowService.open(AddSprintFormComponent, {
      title: `✏️ ${action} sprint`, buttons: this.buttonsConfig, context: {
        sprint: this.sprint,
        mode: 'edit',
        showdate: showdate,
        start: start,
        finish: finish,
      }
    });
    windowRef.onClose.subscribe(() => this.sprintUpdated.emit()); 
  }
}
