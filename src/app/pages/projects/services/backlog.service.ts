import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Task } from '../models/task.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  constructor(private http: HttpClient) { }

  get_backlogTasks(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}project/${id}/backlog`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_sprintsList(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}project/${id}/sprints_list`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  add_task(task: Task): Observable<Task> {
    console.log(task)
    return this.http.post<Task>(`${baseUrl}project/tasks/add`, task)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  update_task(task: Task): Observable<Task> {
    console.log(task)
    return this.http.put<Task>(`${baseUrl}project/tasks/update`, task)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  delete_task(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}project/tasks/${id}/delete`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    )
  }
}
