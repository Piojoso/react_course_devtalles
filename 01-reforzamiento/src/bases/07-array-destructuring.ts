const characterNames = ['Goku', 'Vegeta', 'Trunks']

const [, p2] = characterNames

console.log({ p2 });

const [,, trunks] = characterNames
console.log({trunks});

const returnsArrayFn = ():[string, number] => {
    const a = 100
    const b = 23

    const letters = 'abc'

    return [letters + 'a', a + b]
}

const [letters, numbers] = returnsArrayFn()

console.log({ letters, numbers })