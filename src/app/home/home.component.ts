import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../classes/usuario';
import { PublicacionComponent } from '../publicacion/publicacion.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user: Usuario;
  publicaciones: PublicacionComponent[];

  constructor(private loger: AuthService, private dataserver: DataService) {
    console.log('Home constructor fired from home');
    this.publicaciones = new Array();
  }

  ngOnInit() {
    if (!this.loger.myUser) {
      this.loger.getUser().subscribe((data: any) => {
        console.log('desde API session', data);
        if (data.status) {
          this.loger.myUser = new Usuario(data.userdata);
          this.user = this.loger.myUser;
          this.loger.logeado = data.status;
          console.log('this is the user from home on remote server call', this.user);
        }
      });
    } else {
      console.log('Usuario session already exist from home');
      this.user = this.loger.myUser;
    }
    this.dataserver.getpostfeed().subscribe((info: any) => {
      if (info.status) {
        info.data.forEach(element => {
          console.log('este elemneto es una publicacion', element);
          this.publicaciones.push(new PublicacionComponent());
        });
      }
    });
  }

  dodata() {
    console.log('data reached');
    this.dataserver.getpostfeed().subscribe(
      (data: any) => {
        console.log('goteen from API:', data);
      });
  }

  checkuserage() {
    if (this.loger.myUser.edad >= 10) {
      console.log('su usuario si es mayor de eedad', this.loger.myUser);
      return true;
    }
    return false;
  }

}
