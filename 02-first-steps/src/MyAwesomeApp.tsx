import type { CSSProperties } from 'react';

const firstName = 'Leonel';
const lastName = 'Bongiovanni';

const favoriteGames = [
  'Portal 2',
  'Hollow Knight',
  'Need for speed Underground 2',
];

const isActive = true;

const address = {
  zipCode: 'abc123',
  country: 'Argentina',
};

const myStyles: CSSProperties = {
  backgroundColor: '#fafafa',
  borderRadius: isActive ? 10 : 20,
  padding: 10,
  marginTop: 30,
};

export function MyAwesomeApp() {
  return (
    <>
      <h1 data-testid="firstname-heading">{firstName}</h1>
      <h3>{lastName}</h3>

      <p>{favoriteGames.join(', ')}</p>

      <h1>{isActive ? 'Activo' : 'Desactivado'}</h1>

      <p style={myStyles}>{JSON.stringify(address)}</p>
    </>
  );
}
