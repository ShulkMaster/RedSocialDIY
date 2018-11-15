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

  constructor() {
    console.log('publicacion contructor fired');
    /*
    this.titulo = datafeed.titulo;
    this.autor = datafeed.autor;
    this.contenido = datafeed.contenido;
    this.map = datafeed.map;
    this.publish = datafeed.publish;
    this.version = datafeed.version;
    this.views = datafeed.views;
    */
  }

  ngOnInit() {
  }

}
