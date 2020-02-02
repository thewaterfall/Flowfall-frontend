import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {RowMessage} from '../models/RowMessage';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RowMessageService {

  BASE_URL = `${environment.api_url}/rowMessages`;

  constructor(private http: HttpClient) { }

  getRowMessagesByRowId(rowId: number): Observable<RowMessage[]> {
    return this.http.get<RowMessage[]>(`${this.BASE_URL}/r/${rowId}`);
  }

  deleteRowMessage(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  update(msg: RowMessage): Observable<any> {
    return this.http.put(`${this.BASE_URL}`, msg);
  }
}
