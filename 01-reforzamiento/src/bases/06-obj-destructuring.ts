const person = {
    name: 'Tony',
    age: 55,
    key: 'Ironman'
}

const { name:personName, age:personAge, key } = person

console.log({personName, personAge, key});

interface Hero {
    name: string,
    age: number,
    key: string,
    rank?: string
}

const useContext = ( { key, name, age, rank = 'Sin rango' }: Hero) => {
    
    return {
        keyname: key,
        user: { name, age },
        rank
    }
}

const { keyname, user:{name, age}, rank } = useContext(person)

console.log({keyname, rank, name, age});


