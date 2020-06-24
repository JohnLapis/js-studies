function main(limit) {
    let primes = [];

    for (let i = 2; i < limit + 1; i++) {
        if (numbers[i] === undefined) {
            for (let x = i * 2; x <= limit; x += i) {
                numbers[x] = false
            }
        }
    }

}
