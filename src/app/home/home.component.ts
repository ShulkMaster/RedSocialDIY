import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../classes/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Usuario;

  constructor(private loger: AuthService, private dataserver: DataService) {
    console.log('Home constructor fired from home');
  }

  ngOnInit() {
    if (!this.user) {
      this.user = this.loger.myUser;
      console.log('this is the user from home', this.user);
    }
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
