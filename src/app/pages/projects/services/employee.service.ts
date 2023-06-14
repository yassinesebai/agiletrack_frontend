import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Employee } from '../models/employee.model';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  get_employees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}employees`)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  get_employee_byId(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${baseUrl}employees/${id}`)
    .pipe(
      catchError((error) => {
        console.error('Error occured: ', error);
        throw error;
      })
    )
  }

  update_profile(data: FormData): Observable<any> {
    console.log(data);
    return this.http.put<any>(`${baseUrl}employees/update`, data)
    .pipe(
      catchError((error) => {
        console.error('Error occured: ', error);
        throw error;
      })
    )
  }

  update_profile_image(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${baseUrl}employees/${id}/update_image`, data)
    .pipe(
      catchError((error) => {
        console.error('Error occured: ', error);
        throw error;
      })
    )
  }
}