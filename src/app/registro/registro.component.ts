import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  formregis: FormGroup;
  submited = false; // Este booleano se usa para hacer cambiso en el css si se envia y fallan las validadciones
  exito = false; // este booleano de aqui es el que controla si la app pasa a la siguiente ruta o no

  constructor(private userSuscriber: AuthService) {
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
          Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
        ]
      ));

    this.formregis.addControl(
      'conpasswd',
      new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
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
    console.log('ok registrando...', this.pickdata());
    this.userSuscriber.resgisterUser(this.pickdata());
  }

  private pickdata() {
    const datapackage = {
      email: this.formregis.controls.email.value,
      username: this.formregis.controls.username.value,
      passwd: this.formregis.controls.passwd.value
    };
    return datapackage;
  }
}
