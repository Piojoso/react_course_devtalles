import { heroes, type Hero, type Owner } from "../data/heroes.data";

export const getHeroesByOwner = (owner: Owner):Hero[] => {
    return heroes.filter((hero) => hero.owner === owner)
}
