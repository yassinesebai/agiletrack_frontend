import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Job } from '../models/Job.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  get_jobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${baseUrl}jobs`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }
}
