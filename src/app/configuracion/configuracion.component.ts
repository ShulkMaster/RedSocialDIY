import { Component, OnInit} from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(public session: AuthService) { }

  ngOnInit() {
  }

  clickConfigGeneral(){
    console.log("estoy en configuracion general");
  }
  clickConfigPrivado(){
    console.log("estoy en la configuracion de la privacidad");
  }

}
