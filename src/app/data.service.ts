import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  someservice() {
    return this.http.get('https://reqres.in/api/users');
  }

  isUser(username: string, passwd: string){
    console.log(username, passwd)
    this.http.post('/srv',{username,passwd}).subscribe(
      data => {
        console.log(data, "from server");
      }
    );
  }

}

