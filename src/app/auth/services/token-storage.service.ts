import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtResponse} from '../JwtResponse';

const TOKEN_KEY = 'AuthAccessToken';
const EMAIL_KEY = 'AuthEmail';

@Injectable()
export class TokenStorageService {

  private jwtService = new JwtHelperService();

  constructor() { }

  clear() {
    window.localStorage.clear();
  }

  saveData(data: JwtResponse) {
    this.saveToken(data.accessToken);
    this.saveEmail(data.email);
  }

  isTokenValid(token: string) {
    let isTokenValid = false;

    if(token != null) {
      try {
        isTokenValid = !this.jwtService.isTokenExpired(token);
      } catch {
        this.clear();
      }
    }

    return isTokenValid;
  }

  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  saveEmail(email: string) {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.setItem(EMAIL_KEY, email);
  }

  getEmail(): string {
    return window.localStorage.getItem(EMAIL_KEY);
  }

  getId() {
    return this.decodeJwt(this.getToken()).id;
  }

  private decodeJwt(jwt: string) {
    const jwtData = jwt.split('.')[1];
    const decodedJwt = JSON.parse(atob(jwtData));

    return decodedJwt;
  }

}
