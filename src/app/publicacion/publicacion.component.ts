import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  cPostUrl: String;
  autor: string;

  constructor(private ruter: ActivatedRoute) {
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
    this.ruter.paramMap.subscribe( param => {
      this.cPostUrl = param.get('postname');
      this.autor = param.get('user');
    });
  }

  onScroll() {
    console.log('scrolled!!');
  }

}
