import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {RowMessage} from '../models/RowMessage';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RowMessageService {

  BASE_URL = `${environment.api_url}/boards`;

  constructor(private http: HttpClient) { }

  getRowMessagesByRowId(boardId: number, colId: number, rowId: number): Observable<RowMessage[]> {
    return this.http.get<RowMessage[]>(`${this.BASE_URL}/${boardId}/columns/${colId}/rows/${rowId}/messages`);
  }

  deleteRowMessage(boardId: number, colId: number, rowId: number, id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${boardId}/columns/${colId}/rows/${rowId}/messages/${id}`);
  }

  update(boardId: number, colId: number, rowId: number, msg: RowMessage): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${boardId}/columns/${colId}/rows/${rowId}/messages`, msg);
  }
}
