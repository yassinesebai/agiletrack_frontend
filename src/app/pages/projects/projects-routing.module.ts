import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ChooseProjectComponent } from './choose-project/choose-project.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintsComponent } from './sprints/sprints.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: ProjectsComponent,
  children: [
    {
      path: 'choose_project',
      component: ChooseProjectComponent,
    },
    {
      path: ':id/overview',
      component: ProjectOverviewComponent,
    },
    {
      path: ':id/backlog',
      component: BacklogComponent,
    },
    {
      path: ':id/sprints',
      component: SprintsComponent,
    },
    {
      path: '',
      component: ManageProjectsComponent,
    },
    {
      path: ':id/board',
      component: KanbanBoardComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }

export const routedComponents = [
  ProjectsComponent,
  ChooseProjectComponent,
  ProjectOverviewComponent,
  BacklogComponent,
  SprintsComponent,
  ManageProjectsComponent,
  KanbanBoardComponent,
]