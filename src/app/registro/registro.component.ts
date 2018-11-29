import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Passwordcheck } from './passmatch';
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  formregis: FormGroup;

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
