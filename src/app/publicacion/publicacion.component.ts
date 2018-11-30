import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from '../classes/Publicacion';
import { Usuario } from '../classes/usuario';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  cPostUrl: string;
  autor: Usuario;
  holder: Publicacion;
  failed = false;
  tempstring = 'Loading...';
  structure: ElementRef[];
  onEdit = false;
  @ViewChild('pop') cuadropublic: ElementRef;
  sameautor = false;

  constructor(private ruter: ActivatedRoute,
    public dataserver: DataService,
    public usernull: AuthService) {
    console.log('publicacion contructor fired');
    this.holder = new Publicacion();
    this.autor = new Usuario({username: 'Loading....', favcolor: {r: 20, g: 120, b: 130}});
    this.structure = new Array<ElementRef>();
  }

  ngOnInit() {
    this.ruter.paramMap.subscribe(param => {
      this.cPostUrl = param.get('user') + '/' + param.get('postname');
      console.log(this.cPostUrl);
      if (param.get('postname') === null) {
        this.hexch();
      } else {
        this.plume();
      }
    });
  }

  plume() {
    this.dataserver.getpost(this.cPostUrl).subscribe((respown: any) => {
      console.log('esto es la publicacion: ', respown);
      if (respown.status) {
        this.autor = new Usuario(respown.data);
        this.holder.setdata(respown.data.publicacion);
        if (this.usernull.myUser) {
          if (this.holder.autorid === this.usernull.myUser._id) {
            this.sameautor = true;
          }
        }
      } else {
        this.failed = true;
      }
    });
  }

  hexch() {
    console.log('hola prro hexted');
  }
}
