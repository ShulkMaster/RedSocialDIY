import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from '../classes/Publicacion';
import { Usuario } from '../classes/usuario';
import { DataService } from '../data.service';

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
  @ViewChild('pop') cuadropublic: ElementRef;

  constructor(private ruter: ActivatedRoute, private renderer: Renderer2, public dataserver: DataService) {
    console.log('publicacion contructor fired');
    this.holder = new Publicacion();
    this.ruter.paramMap.subscribe(param => {
      this.cPostUrl = param.get('user') + '/' + param.get('postname');
      console.log(this.cPostUrl);
    });
    this.autor = new Usuario({username: 'Loading....', favcolor: {r: 20, g: 120, b: 130}});
    this.structure = new Array<ElementRef>();
  }

  ngOnInit() {
    this.dataserver.getpost(this.cPostUrl).subscribe((respown: any) => {
      console.log('esto es la publicacion: ', respown);
      if (respown.status) {
        this.autor = new Usuario(respown.data);
        this.holder.setdata(respown.data.publicacion);
      } else {
        this.failed = true;
      }
    });
  }
}
