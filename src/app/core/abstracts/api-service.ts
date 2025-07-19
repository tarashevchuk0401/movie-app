import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  // baseUrl = environment.apiUrl;
  baseUrl = 'http://52.90.215.190:3000';

  constructor(protected http: HttpClient) {}
}
