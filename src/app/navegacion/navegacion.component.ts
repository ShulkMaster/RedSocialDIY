import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../classes/usuario';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  user: Usuario;

  constructor(private loger: AuthService) {
    console.log('Navegacion constructor fired', this.user);
  }

  ngOnInit() {
    if (this.loger.logeado) {
      // this.user = this.loger.getUser();
      // console.log('usuario desde navegacion', this.user);
    }
  }

}
