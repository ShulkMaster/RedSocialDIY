let regex = /\l*[aeiou][aeiou][aeiou]\l*/
let parrafo = "esta cadena quiere buscar limpiaunas por que es un triptongo igual que semiautomatico o tambien miau";
console.log(regex.exec(parrafo).values);