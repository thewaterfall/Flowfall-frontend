import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../JwtResponse';

@Injectable()
export class Oauth2Service {

  BASE_URL = `http://localhost:8080/oauth2/code`;

  constructor(private http: HttpClient) { }

  authenticate(provider: string): Observable<JwtResponse> {
    let params: HttpParams = new HttpParams().set('provider', provider).append('redirect_uri', 'http://localhost:4200');

    return this.http.get<JwtResponse>(this.BASE_URL, {params: params});
  }
}
