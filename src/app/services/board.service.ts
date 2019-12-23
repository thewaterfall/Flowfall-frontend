import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.BASE_URL}/${id}`);
  }

  updateBoard(board: Board): Observable<any> {
    return this.http.put<Observable<any>>(this.BASE_URL, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete<Observable<any>>(`${this.BASE_URL}/${id}`);
  }

}
