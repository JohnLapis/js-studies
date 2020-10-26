const fs = require("fs")


fs.readFile(
  process.argv[2], {encoding: 'utf-8'},
  (err, data) => {
    let wordAppearanceMap = {};
    let biggestWordSize = 0;
    for(let word of data.match(/\w+/g)) {
      if (word.length > biggestWordSize) {
        biggestWordSize = word.length
      }
      const count = wordAppearanceMap.word
      wordAppearanceMap.word = count === undefined ? 1 : count + 1
    }

    for(let [word, count] of Object.entries(wordAppearanceMap)) {
      console.log(`${word} aparece ${count} vezes.`)
    }
  }
)
