import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>
        Welcome To ShopSphere
      </h1>

      <p>
        Discover premium tech
        products at affordable
        prices.
      </p>

      <Link
        to="/products"
        className="shop-btn"
      >
        Shop Now
      </Link>
    </div>
  );
}

export default Home;