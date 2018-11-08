import { Injectable } from '@angular/core';
import { usuario } from '../classes/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  myUser: usuario;
  itwork: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient, public router: Router) {
    console.log('auth contructor fired');
  }

  isUser(info: Object){
    console.log(info, 'Send to server');
    this.http.post('/srv',info).subscribe(
      (data: any) => {
        console.log(data, 'gotten from server');
        this.itwork = data.status;
        console.log('value before', this.itwork);
        if(this.itwork){
          this.myUser = new usuario(data.userdata);
          this.router.navigate(['']);
        }
      });
  }

}
