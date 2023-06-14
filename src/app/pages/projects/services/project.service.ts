import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  get_projects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}projects`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_user_projects(user_id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}projects/user/${user_id}`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_project(id: number): Observable<Project> {
    return this.http.get<Project>(`${baseUrl}project/${id}`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_latest_tasks(id: number) {
    return this.http.get<Task[]>(`${baseUrl}project/${id}/latest_tasks`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_team_members(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}project/${id}/team_members`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  //CRUD
  add_project(project: Project): Observable<Project> {
    console.log(project)
    return this.http.post<Project>(`${baseUrl}projects/add`, project)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  update_project(project: Project): Observable<Project> {
    console.log(project)
    return this.http.put<Project>(`${baseUrl}projects/update`, project)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  delete_project(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}projects/${id}/delete`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    )
  }
}
