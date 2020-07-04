// benchmarking of getting the sum of all salaries in object with sub-objects
// the recursive and iterative approches will be used

let company = {
    sales: [{
        name: 'John',
        salary: 1000
    }, {
        name: 'Alice',
        salary: 1600
    }],

    development: {
        sites: [{
            name: 'Peter',
            salary: 2000
        }, {
            name: 'Alex',
            salary: 1800
        }],

        internals: [{
            name: 'Jack',
            salary: 1300
        }]
    }
};

function recGetSum(obj) {

}

function iterGetSum(obj) {
    let sum = 0
    for (let item of obj) {
        if (obj.salary) {
            sum += obj.salary
        } else {
            for (let subItem of item) {
                0
            }
        }
    }
}

function bench(f) {
    let start = Date.now()
    for (let i = 0; i < 100; i++) f(company)
    let end = Date.now()
    return start - end
}

let c = [5,4]
console.log(c[Symbol.iterator])
// for (let i of company) {
//     console.log(i)
//     for (let j of i) {
//         console.log(j)
//     }
// }
// console.log(`recursive approach: $(bench(recGetSum))`)
// console.log(`iterative approach: $(bench(iterGetSum))`)
