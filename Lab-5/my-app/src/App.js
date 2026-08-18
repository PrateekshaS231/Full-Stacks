import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import About from "./pages/About";

import productsData from "./data/products";

import "./App.css";

function App() {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id);

    if (!product || product.stock === 0) return;

    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );

    const existing = cart.find(
      (item) => item.id === id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    const product = products.find(
      (p) => p.id === id
    );

    if (!product || product.stock === 0)
      return;

    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: p.stock - 1,
            }
          : p
      )
    );

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    const cartItem = cart.find(
      (item) => item.id === id
    );

    if (!cartItem) return;

    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: product.stock + 1,
            }
          : product
      )
    );

    if (cartItem.quantity === 1) {
      setCart(
        cart.filter(
          (item) => item.id !== id
        )
      );
    } else {
      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
      );
    }
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;