function isEmpty(obj) {
    for (let key in obj) {
        return false
    }
    return true
}

let calculator;

calculator = {
    read() {
        this.a = +prompt("a: ");
        this.b = +prompt("b: ");
    },
    sum(a, b) {
        return this.a + this.b
    },
    mul(a, b) {
        return this.a * this.b
    },
}

let ladder;

ladder = {
    step: 0,
    up() {
        this.step++
        return this
    },
    down() {
        this.step--
        return this
    },
    showStep(){
        alert(this.step)
        return this
    }
}
