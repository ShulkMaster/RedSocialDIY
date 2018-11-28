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
    let itemGe = document.getElementById("general"),
        itemPriv = document.getElementById("privacidad");

    itemGe.classList.remove("d-none");
    itemGe.classList.add("d-block");
    itemPriv.classList.remove("d-block");
  }
  clickConfigPrivado(){
    let itemGe = document.getElementById("general"),
        itemPriv = document.getElementById("privacidad");
    
      itemGe.classList.add("d-none");
      itemGe.classList.remove("d-block");
      itemPriv.classList.add("d-block");
  }
  opCampoGe(opc){
    
    let itemNewName = document.getElementById('campoNewName'),
        itemNewPass = document.getElementById('campoNewPass'),
        itemNewTema = document.getElementById('campoNewTema');
    switch(opc){
      case 0:
        itemNewName.classList.remove("d-block");
        itemNewPass.classList.remove("d-block");
        itemNewTema.classList.remove("d-block");
        break;
      case 1:
        itemNewName.classList.add("d-block");
        itemNewPass.classList.remove("d-block");
        itemNewTema.classList.remove("d-block");
        break;
      case 2:
        itemNewPass.classList.add("d-block");
        itemNewName.classList.remove("d-block");
        itemNewTema.classList.remove("d-block");
        break;
      case 3:
        itemNewTema.classList.add("d-block");
        itemNewName.classList.remove("d-block");
        itemNewPass.classList.remove("d-block");
        break;
    }
  }

}
