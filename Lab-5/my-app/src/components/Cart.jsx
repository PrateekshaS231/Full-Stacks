function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <div className="qty-controls">
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;