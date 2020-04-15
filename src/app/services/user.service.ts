import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  private BASE_URL = `${environment.api_url}/users`;

  constructor(private http: HttpClient) { }
}
