/**
 * @challenge: Desafío: Arrays
 * 
 * @version: v1.0.0
 * @author: Gaspar Rebord.
 * @fecha: 07/12/2021
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */
// Código de aquí en adelante

class Author {
    constructor(firstName, lastName, age, location) {
        this.Nombre = firstName;
        this.Apellido = lastName;
        this.Edad = age;
        this.Localidad = location;
    }
}

let gaspar = new Author("Gaspar", "Rebord", 19, "Argentina");
console.log(gaspar)


class Getid {
    constructor(firstName, lastName, age, date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.date = date;
    }
    getIdInfo() {
        return "El usuario se llama " + this.firstName + " " + this.lastName + ", tiene " + this.age + " años de edad y nacio el " + this.date;
    }
}

let firstName = prompt("Ingrese su nombre");
let lastName = prompt("Ingrese su apellido");
let age = prompt("Ingrese su edad");
let date = prompt("Ingrese su fecha de nacimiento");

let user = new Getid(firstName, lastName, age, date);
console.log(user);
console.log(user.getIdInfo());

document.getElementById("nombre").innerHTML = user.firstName;
document.getElementById("apellido").innerHTML = user.lastName;
document.getElementById("edad").innerHTML = user.age;
document.getElementById("fecha").innerHTML = user.date;


class Clothes {
    constructor(type, brand, color, material, price) {
        this.type = type;
        this.brand = brand;
        this.color = color;
        this.material = material;
        this.price = price;

    }

}
const cloths = [];
cloths.push(new Clothes("Zapatillas", "Adidas", "Negro", "Cuero", 12999));
cloths.push(new Clothes("Remera", "Adidas", "Azul", "Algodon", 3999));
cloths.push(new Clothes("Campera", "Taberniti", "Marron", "Cuero", 8599));
cloths.push(new Clothes("Pantalones", "Taberniti", "Azul", "Jean", 6999));
cloths.push(new Clothes("Gorra", "New Era", "Azul", "Corderoy", 4599));

console.log(cloths);

cloths.sort(function (a, b) { return a.price - b.price });


displayClothes();





function displayClothes() {
    document.getElementById("show").innerHTML =
        cloths[0].type + ", " + cloths[0].brand + ", " + cloths[0].color + ", " + cloths[0].material + ", $" + cloths[0].price + "<br>" +
        cloths[1].type + ", " + cloths[1].brand + ", " + cloths[1].color + ", " + cloths[1].material + ", $" + cloths[1].price + "<br>" +
        cloths[2].type + ", " + cloths[2].brand + ", " + cloths[2].color + ", " + cloths[2].material + ", $" + cloths[2].price + "<br>" +
        cloths[3].type + ", " + cloths[3].brand + ", " + cloths[3].color + ", " + cloths[3].material + ", $" + cloths[3].price + "<br>" +
        cloths[4].type + ", " + cloths[4].brand + ", " + cloths[4].color + ", " + cloths[4].material + ", $" + cloths[4].price;
}


