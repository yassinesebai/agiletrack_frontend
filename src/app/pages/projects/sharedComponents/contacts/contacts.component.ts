import { Component, Input, OnDestroy } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy {

  private alive = true;

  @Input() team: Employee[];

  constructor() {
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
