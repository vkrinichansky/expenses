import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../../types';

const baseUrl = 'https://api.jsonstorage.net/v1/json';
const jsonId =
  '7d936bd8-db5e-4e99-8ab2-89bc383a0182/73083d14-1e81-4be8-96c9-f5aabad87cf5';
const apiKey = '33902c0f-693a-498d-aeb8-3621780d397d';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<AppState> {
    return this.http.get<AppState>(`${baseUrl}/${jsonId}`);
  }

  updateData(state: AppState): Observable<any> {
    return this.http.put(`${baseUrl}/${jsonId}?apiKey=${apiKey}`, state);
  }
}
