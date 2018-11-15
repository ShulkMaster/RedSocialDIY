import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  titulo: string;
  autor: string;
  contenido: any;
  map: string[];
  publish: boolean;
  version: number;
  tags: string[];
  views: number;

  constructor(info: any) {
    console.log('publivavion contructor fired');
    this.titulo = info.titulo;
    this.autor = info.autor;
    this.contenido = info.contenido;
    this.map = info.map;
    this.publish = info.publish;
    this.version = info.version;
    this.views = info.views;
  }

  ngOnInit() {
  }

}
