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
  @ViewChild('pop') cuadropublic: ElementRef;

  constructor(private ruter: ActivatedRoute, private renderer: Renderer2, public dataserver: DataService) {
    console.log('publicacion contructor fired');
    this.holder = new Publicacion();
    this.ruter.paramMap.subscribe(param => {
      this.cPostUrl = param.get('user') + '/' + param.get('postname');
      console.log(this.cPostUrl);
    });
    this.autor = new Usuario({username: 'Loading....', favcolor: {r: 20, g: 120, b: 130}});
  }

  ngOnInit() {
    this.dataserver.getpost(this.cPostUrl).subscribe((respown: any) => {
      console.log('esto es la publicacion: ', respown);
      if (respown.status) {
        this.autor = new Usuario(respown.data);
        this.holder.setdata(respown.data.publicacion);
        this.genstruc();
      } else {
        this.failed = true;
      }
    });
  }

  private genstruc() {
    const lista = this.renderer.createElement('ul');
    this.renderer.appendChild(this.cuadropublic.nativeElement, lista);
    console.log('elemneto creado: ', lista);
    this.holder.map.forEach(e => {
      const item = this.renderer.createElement('li');
      const text = this.renderer.createText(e);
      this.renderer.appendChild(item, text);
      this.renderer.appendChild(lista, item);
      // from here rea info starts
      const clement = this.genelement(e.charAt(0));
      console.log('elemneto creado de la publicacion: ', clement);
      this.composelement(clement, e);
      this.renderer.appendChild(this.cuadropublic.nativeElement, clement);
    });
  }

  private genelement(tipe: string): ElementRef {
    switch (tipe) {
      case 'i': return this.renderer.createElement('img');
      case 'p': return this.renderer.createElement('p');
      case 's': return this.renderer.createElement('h2');
      default: return this.renderer.createElement('p');
    }
  }

  private composelement(father: ElementRef, content: string) {
    switch (content.charAt(0)) {
      case 's': case'p': this.renderer.appendChild(father, this.renderer.createText(this.retrivecont(content)));
      break;
      case 'i': this.renderer.setAttribute(father, 'src', this.retrivecont(content));
      break;
      default: this.renderer.appendChild(father, this.renderer.createText(this.retrivecont(content)));
    }
  }

  private retrivecont(tipe: string): string {
    try {
      const index = parseInt(tipe.charAt(1), 10);
      switch (tipe.charAt(0)) {
        case 'p': return this.holder.contenido.parrafos[index];
        case 'i': return this.holder.contenido.imagenes[index];
        case 's': return this.holder.contenido.subtitulos[index];
        default: return 'Error parsing data';
      }
    } catch (ero) {
      console.log('error cachado NAN');
      return 'Error parsing data';
    }
  }
}
