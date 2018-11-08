export class usuario{

    name: string;
    username: string;
    titulo: string;
    edad: number;

    constructor(info: any){
        this.name = info.name;
        this.username = info.username;
        this.edad = info.age;
    }

}