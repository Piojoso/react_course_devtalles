
const ironman = {
    firstName: "Tony",
    lastName: "Stark",
    age: 45,
    address: {
        zipcode: 12345
    }
}

console.log('ironman', ironman);

const spiderman = ironman // No crea clonación, asigna por memoria

spiderman.firstName = 'Peter'
spiderman.lastName = 'Parker'
spiderman.age = 18

console.log('ironman', ironman);
console.log('spiderman', spiderman);

const thor = {...ironman} // It "clone" only at the first level

thor.firstName = 'Thor'
thor.lastName = 'Odinson'
thor.age = 1200
thor.address.zipcode = 98765

console.log('ironman', ironman);
console.log('spiderman', spiderman)
console.log('thor', thor);

const captainAmerican = structuredClone(ironman) // This is the real "cloner"

captainAmerican.firstName = "Steve"
captainAmerican.lastName = "Roger"
captainAmerican.age = 90
captainAmerican.address.zipcode = 34567

console.table([ironman, spiderman, thor, captainAmerican])
