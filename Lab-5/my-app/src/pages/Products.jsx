import ProductList from "../components/ProductList";

function Products({
  products,
  addToCart,
}) {
  return (
    <ProductList
      products={products}
      addToCart={addToCart}
    />
  );
}

export default Products;