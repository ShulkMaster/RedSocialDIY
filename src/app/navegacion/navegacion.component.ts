import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})

export class NavegacionComponent implements OnInit {

  constructor(public session: AuthService) {
    console.log('Navegacion constructor fired');
    /* session es un servicio de tipo AuthService, dentro de el esta
    una variable llamada myuser que es el usurio que sta loguedo, retorna
    undefined si no esta creado;
    ver el archivo src/app/classes/usuario.ts o ctrl + Espace con intellisence para detalles de sus propiedades
    */
  }

  ngOnInit() {
  }

  logout() {
    console.log('log out fired');
    this.session.destroySession();
  }

}
