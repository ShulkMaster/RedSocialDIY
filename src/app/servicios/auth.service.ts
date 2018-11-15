import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  myUser: Usuario;
  logeado = false;

  constructor(private http: HttpClient, public router: Router) {
    console.log('auth contructor fired');
  }

  getSession(cb) {
    if (!this.myUser) {
        this.getUser().subscribe((data: any) => {
          console.log('desde API session', data);
          if (data.status) {
            this.myUser = data.userdata;
            this.logeado = data.status;
            cb();
          } else {
            cb({err: 'no se puede ..'} );
          }
        });
    } else {
      cb();
    }
  }

  getUser() {
    return this.http.get('/srv/login');
  }

  isUser(info: Object) {
    console.log(info, 'Send to server on login');
    this.http.post('/srv/login', info).subscribe(
      (data: any) => {
        console.log(data, 'gotten from server on login');
        this.logeado = data.status;
        console.log('value before', this.logeado);
        if (this.logeado) {
          this.myUser = new Usuario(data.userdata);
          this.router.navigate(['']);
        }
      });
  }

  resgisterUser(uinfo: any) {
    console.log(uinfo, 'Send to server on register');
    this.http.post('/srv/register', uinfo).subscribe(
      (data: any) => {
        console.log(data, 'gotten from server on register');
      },
      error => {
        console.log(error);
      }
    );

  }

}
