import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Row} from '../models/Row';

@Injectable()
export class RowService {

  BASE_URL = `${environment.api_url}/rows`;

  constructor(private http: HttpClient) {}

  updateRow(row: Row): Observable<Row> {
    return this.http.put<Row>(this.BASE_URL, row);
  }

  addRow(row: Row): Observable<Row> {
    return this.http.post<Row>(this.BASE_URL, row);
  }

  deleteRow(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

}
