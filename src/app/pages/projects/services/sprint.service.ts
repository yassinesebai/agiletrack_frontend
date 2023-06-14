import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Sprint } from '../models/sprint.model';
import { Task } from '../models/task.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(private http: HttpClient) { }

  get_sprints(id: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${baseUrl}project/${id}/sprints`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_active_sprint(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}project/${id}/active_sprint`)
    .pipe(
      catchError((error) => {
        console.error('Error occured:', error);
        throw error;
      })
    )
  }

  get_sprint_tasks(sprint_id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}sprint/${sprint_id}/tasks`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  add_sprint(sprint: Sprint): Observable<Sprint> {
    console.log(sprint)
    return this.http.post<Sprint>(`${baseUrl}project/sprints/add`, sprint)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  update_sprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${baseUrl}project/sprints/update`, sprint)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  delete_sprint(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}project/sprints/${id}/delete`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    )
  }
}