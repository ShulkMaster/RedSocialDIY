import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formlogin: FormGroup;
  submited: boolean = false;
  exito: boolean = false;

  constructor(private formmaker: FormBuilder, private data: DataService) { 
    this.formlogin = this.formmaker.group({
      email: ['', Validators.required],
      passwd: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.data.isUser(this.formlogin.controls.email.value,this.formlogin.controls.passwd.value);
  }

}
