export class Publicacion {

    id: string;
    titulo: string;
    autorid: string;
    resumen: string;
    contenido: any;
    map: string[];
    publish: boolean;
    version: number;
    tags: string[];
    views: number;
    numMatch = new RegExp('[0-9]+');
    letMatch = new RegExp('[a-zA-Z]+');

    remap = { parrafos: [], imgs: [], subtitulos: [] };

    constructor() {
    }

    setdata(material: any) {
        this.id = material._id;
        this.titulo = material.titulo;
        this.autorid = material.autorid;
        this.resumen = material.resumen;
        this.contenido = material.contenido;
        this.map = material.map;
        this.publish = material.publish;
        this.version = material.version;
        this.tags = material.tags;
        this.views = material.views;
        this.remap.parrafos = new Array<number>();
        this.remap.imgs = new Array<number>();
        this.remap.subtitulos = new Array<number>();
        this.genMap();
    }

    private genMap() {
        this.map.forEach( elem => {
            console.log('se parse esto', this.numMatch.exec(elem)[0]);
            const yxnum = parseInt(this.numMatch.exec(elem)[0], 10);
            switch (this.letMatch.exec(elem)[0]) {
                case 'p': this.remap.parrafos.push(yxnum);
                break;
                case 's': this.remap.subtitulos.push(yxnum);
                break;
                case 'i': this.remap.imgs.push(yxnum);
                break;
                default: console.log('no se pudo mapear este contenido: ', elem);
                break;
            }
        });
        console.log('este es el mapa', this.remap);
    }
}
