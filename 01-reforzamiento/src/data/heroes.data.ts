type Owner = 'Marvel' | 'DC'

// Not recommended to be runned on node directly with the new Typescript runner.
// enum Owner {
//     DC,
//     Marvel
// }

export interface Hero {
    id: number,
    name: string,
    owner: Owner
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    owner: 'DC',
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: 'Marvel',
  },
  {
    id: 3,
    name: 'Superman',
    owner: 'DC',
  },
  {
    id: 4,
    name: 'Flash',
    owner: 'DC',
  },
  {
    id: 5,
    name: 'Wolverine',
    owner: 'Marvel',
  },
  {
    id: 6,
    name: 'Ironman',
    owner: 'Marvel'
  }
];

// export default heroes;