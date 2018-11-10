import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { usuario } from '../classes/usuario';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  user: usuario;
  
  constructor(private loger: AuthService) {
    this.user = loger.myUser;
    console.log('Home constructor fired', this.user);
  }

  ngOnInit() {
    if(this.user){
      console.log(this.user)
    }
  }

}
