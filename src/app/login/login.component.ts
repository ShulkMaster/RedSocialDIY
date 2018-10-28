import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  maseegeform: FormGroup;
  submited: boolean = false;
  exito: boolean = false;

  constructor(private formmaker: FormBuilder) { 
    this.maseegeform = this.formmaker.group({
      nombre: ['', Validators.required],
      textmesaqje: ['', Validators.required],
      correo: ['', Validators.email]
    });
  }

  ngOnInit() {
  }

}
