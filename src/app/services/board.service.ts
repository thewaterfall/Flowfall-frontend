import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';

@Injectable()
export class BoardService {
  BASE_URL = `${environment.api_url}/boards`;

  constructor(private http: HttpClient) {}

  getBoardsByUserId(id: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.BASE_URL}/u/${id}`);
  }

  getBoardsByCollaborator(id: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.BASE_URL}/u/${id}/collab`);
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.BASE_URL}/${id}`);
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.BASE_URL, board);
  }

  updateBoard(board: Board): Observable<any> {
    return this.http.put<Observable<any>>(this.BASE_URL, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete<Observable<any>>(`${this.BASE_URL}/${id}`);
  }

  inviteCollaborator(boardId: number, collabEmail: string): Observable<any> {
    let params = new HttpParams().set('collabEmail', collabEmail);

    return this.http.post(`${this.BASE_URL}/${boardId}/invite`, null, {params: params});
  }

}
