import Cart from "../components/Cart";

function CartPage({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <Cart
      cart={cart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
}

export default CartPage;