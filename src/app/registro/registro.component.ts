import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Passwordcheck } from './passmatch';

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
    this.formregis = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email],
      }),
      username: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      passwd:  new FormControl(null, {
        validators: [Validators.required,
          Validators.minLength(8),
          Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
        ]
      }),
      conpasswd: new FormControl(null)
    });
  }

  ngOnInit() {
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
