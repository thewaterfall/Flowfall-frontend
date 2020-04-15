import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Row} from '../models/Row';

@Injectable()
export class RowService {

  BASE_URL = `${environment.api_url}/boards`;

  constructor(private http: HttpClient) {}

  updateRow(boardId: number, colId: number, row: Row): Observable<Row> {
    return this.http.put<Row>(`${this.BASE_URL}/${boardId}/columns/${colId}/rows`, row);
  }

  addRow(boardId: number, colId: number, row: Row): Observable<Row> {
    return this.http.post<Row>(`${this.BASE_URL}/${boardId}/columns/${colId}/rows`, row);
  }

  deleteRow(boardId: number, colId: number, id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${boardId}/columns/${colId}/rows/${id}`);
  }

}
