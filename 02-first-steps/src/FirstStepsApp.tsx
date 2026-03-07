import { ItemCounter } from './shopping-cart/ItemCounter';

export function FirstStepsApp() {
  return (
    <>
      <h1>Shopping Cart</h1>

      {/* Please Gave!!, Allow us to purchase them here in LATAM */}
      <ItemCounter name="Steam Deck" />
      <ItemCounter name="Steam Machine" />
      <ItemCounter name="Steam Controller" quantity={2} />
    </>
  );
}
