import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';

@Injectable()
export class BoardService {
  BASE_URL = `${environment.api_url}/boards`;

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.BASE_URL}`);
  }

  getCollaborativeBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.BASE_URL}/collab`);
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.BASE_URL}/${id}`);
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.BASE_URL, board);
  }

  updateBoard(board: Board): Observable<any> {
    return this.http.put<any>(this.BASE_URL, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }

}
