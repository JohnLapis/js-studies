function aclean(arr) {
    let words = new Map()

    for (let word of arr) {
        let uniqueChars = word.toLowerCase().split('').sort().join('')
        words.set(uniqueChars, word)
    }

    return Array.from(words.values())
}
