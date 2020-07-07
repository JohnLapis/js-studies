function t1() {
    var x = 1;
    console.log(x); // 1
    if (true) {
	      var x = 2;
	      console.log(x); // 2
    }
    console.log(x); // 2

}

let a = [1, 56, 5]
function t2() {
    a = 4
    a.push(45)
    return a
}

console.log(t2())
