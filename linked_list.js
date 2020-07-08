"use strict";

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printReverseListR(list) {
    if (list.next) printReverseListR(list.next)
    console.log(list.value)
}

function printListR(list) {
    console.log(list.value)
    if (list.next) printListR(list.next)
}

function printListI(list) {
    while (list) {
        console.log(list.value)
        list = list.next
    }
}

function printReverseListI(list) {
    let temp = []
    while (list) {
        temp.unshift(list.value)
        list = list.next
    }
    temp.forEach(i => console.log(i));
}

printReverseListR(list)
console.log('---------')
printListR(list)
console.log('---------')
printListI(list)
console.log('---------')
printReverseListI(list)
