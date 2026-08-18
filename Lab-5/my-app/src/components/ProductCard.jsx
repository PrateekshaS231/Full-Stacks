function ProductCard({
  product,
  addToCart,
}) {
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="price">
        ₹{product.price}
      </p>

      <p className="stock">
        Stock Left: {product.stock}
      </p>

      <button
        disabled={product.stock === 0}
        onClick={() =>
          addToCart(product.id)
        }
      >
        {product.stock === 0
          ? "Out Of Stock"
          : "Add To Cart"}
      </button>
    </div>
  );
}

export default ProductCard;