import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("user")!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public set userValue(value: any) {
    this.userSubject.next(value);
    console.log(value)
    localStorage.setItem("user", JSON.stringify(value));
  }

  login(data: any) {
    return this.http
      .post<any>(`${baseUrl}auth/login/`, data)
      .pipe(
        tap((user) => {
          user.isLead = user.groups.includes('lead');
          localStorage.setItem("user", JSON.stringify(user));
          this.userSubject.next(user);
          console.log(this.userValue)
          this.router.navigate(["/projects/choose_project"]);
          return user;
        }),
      );
  }

  register(data: any) {
    return this.http
      .post<any>(`${baseUrl}auth/register/`, data)
      .pipe(
        tap(() => {
          this.router.navigate(["/auth/login"]);
        }),
        catchError((error) => {
          console.error('Error occurred:', error);
          throw error;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }
}
