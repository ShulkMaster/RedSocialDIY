import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  someservice() {
    return this.http.get('https://reqres.in/api/users');
  }

  getpostfeed() {
    return this.http.get('/srv/posts');
  }
}

