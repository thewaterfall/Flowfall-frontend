import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable()
export class UserService {

  private BASE_URL = `${environment.api_url}/users`;

  constructor(private http: HttpClient) { }

  getOwnerByBoardId(boardId: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/b/${boardId}/owner`);
  }

  getCollaboratorsByBoardId(boardId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/b/${boardId}/collab`);
  }
}
