import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formlogin: FormGroup;
  submited: boolean = false;
  exito: boolean = false;

  constructor(private formmaker: FormBuilder) { 
    this.formlogin = this.formmaker.group({
      email: ['', Validators.required],
      passwd: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    alert('hola'+ this.formlogin.controls.email.value);
  }

}
