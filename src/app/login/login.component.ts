import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DataService} from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formlogin: FormGroup;
  submited: boolean = false;
  exito: boolean = false;
  private data: DataService

  constructor(private formmaker: FormBuilder) { 
    this.formlogin = this.formmaker.group({
      email: ['', Validators.required],
      passwd: ['', Validators.required]
    });
    this.data = new DataService();
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.formlogin.controls.email.value == 'hola'){
      
    }
  }

}
