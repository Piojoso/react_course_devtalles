const firstName = 'Leonel';
const lastName = 'Bongiovanni';

const favoriteGames = [
  'Portal 2',
  'Hollow Knight',
  'Need for speed Underground 2',
];

const isActive = false;

const address = {
  zipCode: 'abc123',
  country: 'Argentina',
};

export function MyAwesomeApp() {
  return (
    <>
      <h1>{firstName}</h1>
      <h3>{lastName}</h3>

      <p>{favoriteGames.join(', ')}</p>

      <h1>{isActive ? 'Activo' : 'Desactivado'}</h1>

      <p>{JSON.stringify(address)}</p>
    </>
  );
}
