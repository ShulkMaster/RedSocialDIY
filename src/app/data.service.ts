import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  publicaciones = new BehaviorSubject<any[]>([]);

  theEnd = false;

  constructor(private http: HttpClient) {
    console.log('data service contructor fired');
  }

  getpostfeed(cindex: Number) {
    this.http.post('/srv/posts', {lastOne : cindex}).subscribe((respow: any) => {
      if (!respow.status) {
        this.publicaciones.next(this.publicaciones.getValue().concat(respow.error));
        this.theEnd = true;
      }
      console.log('data', respow.data);
      if (respow.data.length === 0) {
        this.theEnd = true;
      } else {
        this.publicaciones.next(this.publicaciones.getValue().concat(respow.data));
      }
    });
  }

}

