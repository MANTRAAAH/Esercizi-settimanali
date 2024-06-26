import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const datiAccesso=this.auth.getAccessData()
    if(!datiAccesso)return next.handle(request);
    const nuovaReq=request.clone({
      headers:request.headers.append('Authorization',`Bearer ${datiAccesso.accessToken}`)
    })
    return next.handle(request);
  }
}
