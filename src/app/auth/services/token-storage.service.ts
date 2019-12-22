import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from '../../models/Role';

const TOKEN_KEY = 'AuthAccessToken';
const EMAIL_KEY = 'AuthEmail';
const ID_KEY = 'AuthId';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable()
export class TokenStorageService {

  private jwtService = new JwtHelperService();

  constructor() { }

  clear() {
    window.sessionStorage.clear();
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
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  getEmail(): string {
    return window.sessionStorage.getItem(EMAIL_KEY);
  }

  saveId(id: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  getId() {
    return window.sessionStorage.getItem(ID_KEY);
  }

  saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): Role[] {
    let roles: Role[] = [];

    JSON.parse(window.sessionStorage.getItem(AUTHORITIES_KEY)).foreach(authority => {
      roles.push(new Role(authority));
    });

    return roles;
  }

}
