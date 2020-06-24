function min(a, b) {
    return a < b ? a : b;
}

function isNatural(n) {
    return n >= 1 && Math.trunc(n) == n
}

function pow(x, n) {
    if (isNatural(n)) {
        return x ** n
    } else {
        alert("not a natural number")
    }
}

// let a
// let b
a = +prompt("first number")
b = +prompt("second number")

alert(min(a, b))
alert(pow(a, b))
