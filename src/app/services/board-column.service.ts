import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BoardColumn} from '../models/BoardColumn';
import {Observable} from 'rxjs';

@Injectable()
export class BoardColumnService {

  BASE_URL = `${environment.api_url}/boardColumns`;

  constructor(private http: HttpClient) {}

  updateBoardColumn(boardColumn: BoardColumn): Observable<BoardColumn> {
    return this.http.put<BoardColumn>(this.BASE_URL, boardColumn);
  }

  addBoardColumn(boardColumn: BoardColumn): Observable<BoardColumn> {
    return this.http.post<BoardColumn>(this.BASE_URL, boardColumn);
  }

  deleteBoardColumn(id: number): Observable<any> {
   return this.http.delete(`${this.BASE_URL}/${id}`);
  }

}
