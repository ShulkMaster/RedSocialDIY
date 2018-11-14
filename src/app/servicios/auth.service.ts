import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  myUser: Usuario;
  itwork = false;

  constructor(private http: HttpClient, public router: Router) {
    console.log('auth contructor fired');
    this.getUser();
    console.log('this is my user now', this.myUser);
  }

  private  getUser() {
     this.http.get('/srv/prueba').subscribe(
      (data: any) => {
        console.log('gotten from server on getuser', data);
        if (data) {
          this.myUser = new Usuario(data);
          this.itwork = true;
        }
      }
    );
  }


  isUser(info: Object) {
    console.log(info, 'Send to server on login');
    this.http.post('/srv/prueba', info).subscribe(
      (data: any) => {
        console.log(data, 'gotten from server on login');
        this.itwork = data.status;
        console.log('value before', this.itwork);
        if (this.itwork) {
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
