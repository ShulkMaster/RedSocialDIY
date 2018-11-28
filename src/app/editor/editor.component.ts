import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { PublicacionComponent } from '../publicacion/publicacion.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  @ViewChild(PublicacionComponent) pubilicat: PublicacionComponent;
  @Input() superstring = '';
  slectedIndex: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  startEdit(e) {
    console.log('cosa rara', e);
    const algoraro = this.pubilicat.cuadropublic.nativeElement.querySelectorAll('p');
    console.log('modo edicion activado', algoraro);
    algoraro.forEach( (node, indec) => {
      this.renderer.listen(node, 'click', evt => {
        algoraro.forEach(element => {
          this.renderer.removeClass(element, 'onedit');
        });
        console.log('Me diste clik', evt.target, indec);
        this.renderer.addClass(node, 'onedit');
        this.slectedIndex = indec - 1;
        this.superstring = node.innerHTML;
      });
    });
  }

  updatevalue() {
    console.log('ahuevo actualiza');
    this.pubilicat.holder.contenido.parrafos[this.slectedIndex] = this.superstring;
    this.pubilicat.cuadropublic.nativeElement.querySelectorAll('p')[this.slectedIndex].innerHTML = this.superstring;
  }

}
