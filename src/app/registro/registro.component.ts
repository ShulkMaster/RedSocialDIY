import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  formregis: FormGroup;
  submited: boolean = false; // Este booleano se usa para hacer cambiso en el css si se envia y fallan las validadciones
  exito: boolean = false; //este booleano de aqui es el que controla si la app pasa a la siguiente ruta o no

  constructor(private formmaker: FormBuilder, private userSuscriber: AuthService, private formBuilder: FormBuilder) {
    this.formregis = new FormGroup({});
  }

  ngOnInit() {
    this.formregis.addControl(
      'email',
      new FormControl(null, [Validators.required, Validators.email])
    );

    this.formregis.addControl(
      'username',
      new FormControl(null, [Validators.required])
    );

    this.formregis.addControl(
      'passwd',
      new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
        ]
      ));

    this.formregis.addControl(
      'conpasswd',
      new FormControl(
        null,
        [
          Validators.required
        ]
      )
    );

    this.formregis.addControl(
      'checkb', new FormControl(
        false,
        [Validators.requiredTrue]
      )
    );
  }

  registrar() {
    console.log('ok registranod...', this.pickdata());
    this.userSuscriber.resgisterUser(this.pickdata());
  }

  pickdata() {
    const datapackage = {
      email: this.formregis.controls.email.value,
      username: this.formregis.controls.username.value,
      passwd: this.formregis.controls.passwd.value
    };
    return datapackage;
  }

  status(): void {
    let elemento: boolean = (<HTMLInputElement>document.getElementById("exampleCheck1")).checked;
    if(elemento==true){
      let estado: boolean = (<HTMLButtonElement>document.getElementById("registro")).disabled=false;
      console.log("Estoy activo");
    }
    else if(elemento==false){
      let estado: boolean = (<HTMLButtonElement>document.getElementById("registro")).disabled=true;
      console.log("No estoy activo");
    }
  }
  
  estado(): boolean {
    let elemento = this.formregis.controls.checkb.value;
    let passw = this.formregis.controls.passwd.value;
    let conpassw = this.formregis.controls.conpasswd.value;
    if(passw==conpassw && elemento==false){
      return (<HTMLButtonElement> document.getElementById("registro")).disabled=true;
    }
    else if(passw==conpassw && elemento==true){
      return (<HTMLButtonElement> document.getElementById("registro")).disabled=false;
    }
    else if(passw!=conpassw && elemento==false){
      return (<HTMLButtonElement> document.getElementById("registro")).disabled=true;
    }
    else if(passw!=conpassw && elemento==true){
      return (<HTMLButtonElement> document.getElementById("registro")).disabled=true;
    }
  }

}