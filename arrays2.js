function camelize(str) {
    return str
        .split('-')
        .map((word, i) => i == 0 ? word : word[0].toUpperCase() + word.slice(1))
        .join("")
}

function filterRange(arr, start, end) {
    return arr.filter(item => item >= start && item <= end)
}

function filterRangeInPlace(arr, start, end) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < start || arr[i] > end) {
            arr.splice(i, 1)
            i--
        }
    }
}

function reverseSort(arr) {
    arr.sort((a, b) => a - b)
}

function Calculator() {
    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
    }

    this.calculate = (exp) => {
        let [a, operator, b] = exp.split(' ')
        return this.methods[operator](+a, +b)
    }

    this.addMethod = (operator, func) => this.methods[operator] = func
}
function randItem(arr) {
    const randint = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min

    return arr[randint(arr.length - 1, 0)]
}

function shuffle(arr) {
    let options = []
    let newArr = new Array(arr.length)

    for (let i = 0; i < arr.length; i++) {
        options.push(i)
    }

    for (let item of arr) {
        let newIndex = randItem(options)
        alert(newIndex)
        newArr[newIndex] = item
        delete options[newIndex]
    }

    return newArr

}

function unique(arr) {
    let uniqueArr = []

    for (let item of arr) {
        if (!uniqueArr.includes(item)) uniqueArr.push(item)
    }
    return uniqueArr
}

