import { heroes, type Hero } from "../data/heroes.data"

const getHeroById = (id: number): Hero | undefined => {
    return heroes.find((hero) => hero.id === id)
} 

console.log(getHeroById(6));

