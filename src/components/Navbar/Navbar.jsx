import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, dataSelect } from "../../store/categorySlice";
import { getCartTotals } from "../../store/cartSlice";

const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector(dataSelect);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotals());
  }, [dispatch]);

  const { totalItem } = useSelector((state) => state.cartReducer);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          {/* Logo */}
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Shopping</span>
              <span className="text-gold">SP</span>
            </Link>

            {/* Search */}
            <form className="navbar-search flex">
              <input type="text" placeholder="Search..." />
              <button className="navbar-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className="btn-txt fw-5">
                  cart <span className="cart-count-value">{totalItem}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <ul
              className={`nav-links flex ${
                isSideBarOpen ? "show-nav-links" : ""
              }`}
            >
              <button
                className="navbar-hide-btn text-white"
                onClick={() => setIsSideBarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>

              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    onClick={() => setIsSideBarOpen(false)}
                    to={`/category/${category.id}`}
                    className="nav-link text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className="navbar-show-btn text-gold"
              onClick={() => setIsSideBarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
