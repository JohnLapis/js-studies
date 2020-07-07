function IsumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function RsumTo(n) {
    if (n == 1) return 1;
    return n + RsumTo(n - 1);
}

function bench(f) {
    let start = new Date()
    for (let i = 0; i < 100000; i++) f(100)
    let end = new Date()
    return end.getTime() - start.getTime()
}
let a = 0
let b = 0
for (let i = 0; i < 100; i++) {
    a += bench(IsumTo)
    b += bench(RsumTo)
}
console.log(a / 100)
console.log(b / 100)
console.log('----------------------------------')
// console.log(`iterative approach: $(a)`)
// console.log(`recursive approach: $(b)`)
