import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Passwordcheck } from './passmatch';
import { Color } from '../classes/color';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  formregis: FormGroup;
  barwid: number;
  colorPiker: Color;
  lecolor: string;
  submited: boolean;
  exito: boolean;
  mensaje: string;

  constructor(private userSuscriber: AuthService, private maker: FormBuilder) {
    this.formregis = this.maker.group({
      email: new FormControl(null, {
        validators: [Validators.email]
      }),
      username: new FormControl(null, {
        validators: [Validators.required,
          Validators.minLength(6)],
        updateOn: 'blur'
      }),
      passwd:  new FormControl(null, {
        validators: [Validators.required,
          Validators.minLength(8),
          Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
        ]
      }),
      conpasswd: new FormControl(null, {
        validators: [Passwordcheck]
      }),
      checkb: new FormControl(
        false,
        [Validators.requiredTrue]
      )
    });
    this.formregis.controls.passwd.valueChanges.subscribe(
      valor => this.formregis.controls.conpasswd.updateValueAndValidity()
    );
    this.exito = false;
  }

  ngOnInit() {
    this.barwid = 0;
    this.lecolor = Color.geterrorscale(this.barwid);
    this.submited = false;
  }

  registrar() {
    this.submited = true;
    console.log('ok registrando...', this.pickdata());
    this.userSuscriber.resgisterUser(this.pickdata()).subscribe( (data: any) => {
      console.log(data, 'gotten from server on register');
      this.exito = data.status;
      this.mensaje = data.status ?  'Su usuario fue creado correctamente' : 'Error al crear el usuario';
    },
    error => {
      console.log(error);
      this.exito = false;
      this.mensaje = error;
    }
  );
  }

  private pickdata() {
    const datapackage = {
      email: this.formregis.controls.email.value,
      username: this.formregis.controls.username.value,
      passwd: this.formregis.controls.passwd.value
    };
    return datapackage;
  }

  changebarprop() {
    this.barwid = 4;
    console.log(this.formregis.controls.passwd.errors);
    this.barwid = this.formregis.controls.passwd.hasError('required') ? (this.barwid - 4) : this.barwid;
    this.barwid = this.formregis.controls.passwd.hasError('minlength') ? (this.barwid - 1.20) : this.barwid;
    this.barwid = this.formregis.controls.passwd.hasError('pattern') ? (this.barwid - 1.20) : this.barwid;
  }
}
