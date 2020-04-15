import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable()
export class CollaboratorService {
  BASE_URL = `${environment.api_url}/boards`;

  constructor(private http: HttpClient) {}

  inviteCollaborator(boardId: number, collabEmail: string): Observable<any> {
    let params = new HttpParams().set('collabEmail', collabEmail);

    return this.http.post(`${this.BASE_URL}/${boardId}/collab`, null, {params: params});
  }

  deleteCollaborator(collabId: number, boardId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${boardId}/collab/${collabId}`);
  }

  getOwnerByBoardId(boardId: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/${boardId}/collab/owner`);
  }

  getCollaboratorsByBoardId(boardId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/${boardId}/collab`);
  }

}
