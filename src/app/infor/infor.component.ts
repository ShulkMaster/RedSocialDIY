import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.css']
})
export class InforComponent implements OnInit {

  maseegeform: FormGroup;
  submited = false;
  exito = false;

  constructor(private formmaker: FormBuilder) {
    this.maseegeform = this.formmaker.group({
      nombre: ['', Validators.required],
      textmesaqje: ['', Validators.required],
      correo: ['', Validators.email]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submited = true;

    if (this.maseegeform.invalid) {
      return;
    }
    alert('Mensaje enviado');
    this.exito = true;
  }

}
