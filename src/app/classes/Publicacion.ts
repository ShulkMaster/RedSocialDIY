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
    }
}
