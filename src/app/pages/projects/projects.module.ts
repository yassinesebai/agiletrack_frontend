import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ProjectsRoutingModule,
  routedComponents,
} from "./projects-routing.module";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbRadioModule,
  NbListModule,
  NbProgressBarModule,
  NbUserModule,
  NbIconModule,
  NbAccordionModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
  NbToastrModule,
} from "@nebular/theme";
import { ProjectCardComponent } from "./choose-project/project-card/project-card.component";
import { ChooseProjectComponent } from "./choose-project/choose-project.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ChartsModule } from "../charts/charts.module";
import { NgxEchartsModule } from 'ngx-echarts';
import { RecentTasksComponent } from "./project-overview/recent-tasks/recent-tasks.component";
import { BudgetComponent } from "./project-overview/budget/budget.component";
import { BacklogComponent } from "./backlog/backlog.component";
import { AddTaskFormComponent } from "./backlog/add-task-form/add-task-form.component";
import { SprintsComponent } from './sprints/sprints.component';
import { AddSprintFormComponent } from './sprints/add-sprint-form/add-sprint-form.component';
import { TasksListComponent } from './sprints/tasks-list/tasks-list.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ThemeModule } from "../../@theme/theme.module";
import { ProjectsTableComponent } from './manage-projects/projects-table/projects-table.component';
import { AddProjectFormComponent } from './manage-projects/add-project-form/add-project-form.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProjectHeaderComponent } from './project-overview/project-header/project-header.component';
import { MoneyCardComponent } from './project-overview/budget/money-card/money-card.component';
import { PieCharCardComponent } from './project-overview/budget/pie-char-card/pie-char-card.component';
import { BarChartCardComponent } from './project-overview/budget/bar-chart-card/bar-chart-card.component';
import { StatusComponentComponent } from './sharedComponents/status-component/status-component.component';
import { ContactsComponent } from "./sharedComponents/contacts/contacts.component";
import { SolarComponent } from "./sharedComponents/solar/solar.component";
import { BacklogAccordionComponent } from './backlog/backlog-accordion/backlog-accordion.component';
import { AccTasksListComponent } from './backlog/backlog-accordion/acc-tasks-list/acc-tasks-list.component';
import { SprintsAccordionComponent } from './sprints/sprints-accordion/sprints-accordion.component';
import { SprintTasksListComponent } from './sprints/sprints-accordion/sprint-tasks-list/sprint-tasks-list.component';
import { BoardComponent } from './kanban-board/board/board.component';
import { SearchPipe } from "./pipes/search.pipe";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ...routedComponents,
    SearchPipe,
    ProjectCardComponent,
    ChooseProjectComponent,
    ProjectOverviewComponent,
    BacklogComponent,
    RecentTasksComponent,
    BudgetComponent,
    BacklogComponent,
    AddTaskFormComponent,
    SprintsComponent,
    AddSprintFormComponent,
    TasksListComponent,
    ManageProjectsComponent,
    ProjectsTableComponent,
    AddProjectFormComponent,
    KanbanBoardComponent,
    ProjectHeaderComponent,
    MoneyCardComponent,
    PieCharCardComponent,
    BarChartCardComponent,
    StatusComponentComponent,
    ContactsComponent,
    SolarComponent,
    BacklogAccordionComponent,
    AccTasksListComponent,
    SprintsAccordionComponent,
    SprintTasksListComponent,
    BoardComponent,
    ProfileComponent
  ],
  imports: [
    ProjectsRoutingModule,
    DragDropModule,
    NgxEchartsModule,
    NbCardModule,
    NbListModule,
    ThemeModule,
    NbFormFieldModule,
    NbAccordionModule,
    ReactiveFormsModule,
    NbProgressBarModule,
    NbRadioModule,
    NbUserModule,
    CommonModule,
    NbIconModule,
    FormsModule,
    ChartsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    NbSelectModule,
    NbToastrModule,
  ],
  providers: [
    FormBuilder,
  ]
})
export class ProjectsModule {}
