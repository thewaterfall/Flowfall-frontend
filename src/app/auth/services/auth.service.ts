import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {JwtResponse} from '../JwtResponse';
import {TokenStorageService} from './token-storage.service';
import {RegisterRequest} from '../../models/requests/RegisterRequest';
import {LoginRequest} from '../../models/requests/LoginRequest';

@Injectable()
export class AuthService {

  private BASE_URL = `${environment.api_url}/auth`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  authenticate(loginRequest: LoginRequest): Observable<JwtResponse> {
    let url = `${this.BASE_URL}/login`;

    return this.http.post<JwtResponse>(url, loginRequest);
  }

  register(registerRequest: RegisterRequest): Observable<JwtResponse> {
    let url = `${this.BASE_URL}/register`;

    return this.http.post<JwtResponse>(url, registerRequest);
  }


  logout() {
    this.tokenStorage.clear();
  }

  isAuthenticated(): boolean {
    let token = this.tokenStorage.getToken();

    return this.tokenStorage.isTokenValid(token);
  }
}
