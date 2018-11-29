import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';
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

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
  }

  startEdit() {
    console.log('cosa rara');
    const algoraro = this.pubilicat.cuadropublic.nativeElement.querySelectorAll('.parrafo > p');
    console.log('modo edicion activado', algoraro);
    algoraro.forEach( (node, indec) => {
      this.renderer2.listen(node, 'click', evt => {
        algoraro.forEach(element => {
          this.renderer2.removeClass(element, 'onedit');
        });
        console.log('Me diste clik', indec);
        this.renderer2.addClass(node, 'onedit');
        this.slectedIndex = indec;
        this.superstring = node.innerHTML;
      });
    });
  }

  updatevalue() {
    const unnumer = this.pubilicat.holder.remap.parrafos[this.slectedIndex];
    console.log('asi que click en ', this.slectedIndex, 'but selected ', unnumer);
    this.pubilicat.holder.contenido.parrafos[unnumer] = this.superstring;
  }

}
