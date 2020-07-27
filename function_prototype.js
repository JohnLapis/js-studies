"use strict";

function F() {
    this.a = 65
}

let obj = new F()
let obj2 = new obj.constructor()

console.log(JSON.stringify(obj))
console.log(JSON.stringify(obj2))
