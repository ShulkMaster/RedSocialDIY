import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/index';

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
    this.http.get('/srv/posts/' + cindex).subscribe((respow: any) => {
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

  getpost(titulo: string) {
    return this.http.get('/srv/posts/' + titulo);
  }

}

