function one() {
    let styles = ["Jazz", "Blues"]
    styles.push("Rock-n-Roll")
    styles[Math.floor((styles.length - 1) / 2)] = "Classics"
    alert(styles.shift())
    styles.unshift("Rap", "Reggae")
    alert(styles)

}

function sumInput() {
    let numbers = []
    while ( true ) {
        let n = prompt("gimme some numbers")
        if (!+n && n !== "0") break
        numbers.push(+n)
    }

    let sum1 = 0
    for (let i = 0; i < numbers.length; i++) {
        sum1 += numbers[i]
    }
    alert(sum1)

    let sum2 = 0
    for(let n in numbers) {
        sum2 += numbers[n]
    }
    alert(sum2)

    let sum3 = 0
    for(let n of numbers) {
        sum3 += n
    }
    alert(sum3)

    let sum4 = numbers.reduce((a, b) => a + b)
    alert(sum4)

}

function getMaxSubSum(arr) {
    if  (arr.reduce((a, b) => Math.max(a, b)) < 0){
        return 0
    }

    let sums = [arr[0]]
    let i = 0
    for(let n of arr) {
        if (n < 0) {
            continue
        }
        if (n > sums[i]) {
            sums[i] += n
            alert(sums + "  ;;;;;;  " + i)
        } else {
            i++
            sums[i] = n
        }
    }

    alert(sums)

    alert(sums.reduce((a, b) => Math.max(a, b)))
}

["bilbo", "gandalf", "nazgul"].forEach(item, index, array => {
    alert(`${item} is at index ${index} in ${array}`)
})
