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
  colorPíker: Color;
  lecolor: string;

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
  }

  ngOnInit() {
    this.barwid = 0;
    this.lecolor = Color.geterrorscale(this.barwid);
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

  changebarprop() {
    this.barwid = 4;
    console.log(this.formregis.controls.passwd.errors);
    this.barwid = this.formregis.controls.passwd.hasError('required') ? (this.barwid - 4) : this.barwid;
    this.barwid = this.formregis.controls.passwd.hasError('minlength') ? (this.barwid - 1.20) : this.barwid;
    this.barwid = this.formregis.controls.passwd.hasError('pattern') ? (this.barwid - 1.20) : this.barwid;
  }
}
