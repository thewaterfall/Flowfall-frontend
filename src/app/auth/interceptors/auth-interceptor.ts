import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    let token = this.tokenStorage.getToken();

    if (token != null) {
      authRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer' + token)});
    }

    return next.handle(authRequest);
  }

}
