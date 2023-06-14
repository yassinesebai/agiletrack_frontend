import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const user = this.authenticationService?.userValue;
      const isLoggedIn = user?.token;
      if (isLoggedIn) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Token ${user.token}`
              }
          });
      }
      console.log(request)
      return next.handle(request);
  }
}