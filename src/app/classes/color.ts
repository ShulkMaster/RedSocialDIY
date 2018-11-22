export class Color {

    red: number;
    green: number;
    blue: number;

    constructor(componente: any) {
        this.red = componente.r;
        this.green = componente.g;
        this.blue = componente.b;
        this.getColorHex();
    }

    getColorHex() {
        console.log('Color trasnform', '#' + this.toHex(this.red) + this.toHex(this.green) + this.toHex(this.blue));
        return '#' + this.toHex(this.red) + this.toHex(this.green) + this.toHex(this.blue);
    }

    toHex(value: number) {
        const firts: string = this.getHex(Math.trunc(value / 16));
        const second: string = this.getHex(value % 16);
        return firts + second;
    }

    getHex(valor: number) {
        switch (valor) {
            case 10: return 'a';
            case 11: return 'b';
            case 12: return 'c';
            case 13: return 'd';
            case 14: return 'e';
            case 15: return 'f';
            default: return valor.toString();
        }
    }
}
