import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from '../../models/Role';
import {JwtResponse} from '../JwtResponse';

const TOKEN_KEY = 'AuthAccessToken';
const EMAIL_KEY = 'AuthEmail';
const ID_KEY = 'AuthId';
const AUTHORITIES_KEY = 'AuthAuthorities';

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
    this.saveAuthorities(data.authorities);
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
    let jwtData = this.getToken().split('.')[1];
    let decodedJwt = JSON.parse(atob(jwtData));

    return decodedJwt.id;
  }

  saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): Role[] {
    let roles: Role[] = [];

    JSON.parse(window.localStorage.getItem(AUTHORITIES_KEY)).foreach(authority => {
      roles.push(new Role(authority));
    });

    return roles;
  }

}
