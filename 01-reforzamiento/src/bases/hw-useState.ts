
const useState = (value: string) => {
    const fn = (name:string) => console.log(name)
    return [value, fn] as const
}

const [name, setName] = useState('Goku');
console.log(name);       // Goku
setName('Vegeta');       // Imprime "Vegeta"