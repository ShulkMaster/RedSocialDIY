import { color } from './color';

export class Usuario {

    name: string;
    username: string;
    edad: number;
    favcolor: color;
    picture: string;

    constructor(info: any) {
        this.name = info.name;
        this.username = info.username;
        this.edad = info.age;
        this.favcolor = new color(info.favcolor);
        this.picture = info.propicture;
    }

}
