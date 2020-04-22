import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) > 0) {
        this.tokenStorage.clear();
        window.location.reload();
      }

      return throwError(err);
    }));
  }


}
