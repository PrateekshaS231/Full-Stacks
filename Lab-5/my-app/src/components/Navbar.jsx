import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h1>ShopSphere</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;