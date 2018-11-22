import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  publicaciones = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    console.log('data service contructor fired');
    this.getpostfeed();
  }

  getpostfeed() {
    this.http.get('/srv/posts').subscribe((respow: any) => {
      if (!respow.status) {
        this.publicaciones.next(respow.error);
      } else {
        this.publicaciones.next(respow.data);
      }
    });
  }

}

