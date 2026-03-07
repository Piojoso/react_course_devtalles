import { ItemCounter } from './shopping-cart/ItemCounter';

interface ItemInCart {
  productName: string;
  quantity: number;
}

/* Please Gave!!, Allow us to purchase them here in LATAM */
const itemsInCart: ItemInCart[] = [
  { productName: 'Steam Deck', quantity: 1 },
  { productName: 'Steam Machine', quantity: 1 },
  { productName: 'Steam Controller', quantity: 2 },
];

export function FirstStepsApp() {
  return (
    <>
      <h1>Shopping Cart</h1>

      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}
    </>
  );
}
