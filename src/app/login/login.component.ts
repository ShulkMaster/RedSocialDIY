import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formlogin: FormGroup;
  submited: boolean = false; // Este booleano se usa para hacer cambiso en el css si se envia y fallan las validadciones
  exito: boolean = false; //este booleano de aqui es el que controla si la app pasa a la siguiente ruta o no

  constructor(private formmaker: FormBuilder, private uservalidator: AuthService,) { 
    this.formlogin = this.formmaker.group({
      "username": ['', Validators.required],
      "passwd": ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submited = true;
    this.uservalidator.isUser(this.pickdata());
  }

  pickdata(){
    let datapackage = {
      username: this.formlogin.controls.username.value,
      passwd: this.formlogin.controls.passwd.value
    }
    return datapackage;
  }
}
