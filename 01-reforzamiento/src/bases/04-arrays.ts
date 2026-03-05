const myArray: number[] = [1, 3, 5, 7, 9]

// myArray.push('10') // We cannot push a string on a number list. Thanks to Typescript.

console.log(myArray)

const myArray2 = myArray
myArray2.push(10)

console.log({myArray, myArray2});

const realCloned = structuredClone(myArray)
realCloned.push(20)

console.log({myArray, realCloned})


