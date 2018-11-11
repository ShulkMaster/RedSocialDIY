import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { usuario } from '../classes/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: usuario;

  constructor(private loger: AuthService) {
    console.log('Home constructor fired', this.user);
  }

  ngOnInit() {
    if (this.loger.itwork) {
      this.user = this.loger.myUser;
      console.log(this.user);
    }
  }

}
