import React, { useState } from "react";
import "./styles/navbar.css";
import CartIcon from "../assets/Cart Icon.png";
import Logo from "../assets/Logo.png";
import SearchIcon from "../assets/Search Icon.png";
import menu from "../assets/menu.svg";
import closeIcon from "../assets/close.svg";

export default function Navbar() {
  const [menuOpen, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <ul className={`navbar-list ${menuOpen ? "menu-open" : ""}`}>
          <li>
            {menuOpen ? (
              <img
                className="close-icon"
                src={closeIcon}
                alt="close icon"
                onClick={toggleMenu}
              />
            ) : (
              <img
                className="menu-icon"
                src={menu}
                alt="menu icon"
                onClick={toggleMenu}
              />
            )}
            <a href="/home">
              <img src={Logo} alt="The organization's logo which is a leaf" className="logo" />
              <span className="logo-txt">
                Organick
              </span>
            </a>
          </li>
          <div className={`nav-left ${menuOpen ? "show" : ""}`}>
            <li className="hide-me">
              <a href="/home">
                Home
              </a>
            </li>
            <li className="hide-me">
              <a href="/shop">
                Shop
              </a>
            </li>
            <li className="hide-me">
              <a href="/about">
                About Us
              </a>
            </li>
            <li className="hide-me">
              <a href="#">
                <div className="search-container">
                  <img src={SearchIcon} alt="Magnifying glasses in a green background" />
                  <input type="text" placeholder="Search Product" />
                </div>
              </a>
            </li>
            <li className="sm-hide1">
              <div className="cart-container">
                <img src={CartIcon} alt="A white shopping cart icon with a green background" />
                <span>Cart(0)</span>
              </div>
            </li>
            <li className="sm-hide1">
              <a href="/logIn">
                <button className="signIn-btn">
                  Log In
                </button>
              </a>
            </li>
          </div>
        </ul>
        <div
          className={`menu-overlay ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {menuOpen && (
            <div className="hello-world">
            <div className={`nav-leftt ${menuOpen ? "show" : ""}`}>
            <li className="sm-show">
              <a href="/home">
                Home
              </a>
            </li>
            <li className="sm-show">
              <a href="/shop">
                Shop
              </a>
            </li>
            <li className="sm-show">
              <a href="/about">
                About Us
              </a>
            </li>
            <li className="sm-show">
              <a href="#">
                <div className="search-container">
                  <img src={SearchIcon} alt="Magnifying glasses in a green background" />
                  <input type="text" placeholder="Search Product" />
                </div>
              </a>
            </li>
            <li className="sm-hide">
              <div className="sm-show cart-container">
                <img src={CartIcon} alt="A white shopping cart icon with a green background" />
                <span>Cart(0)</span>
              </div>
            </li>
            <li className="sm-show sm-hide btn">
              <a href="/logIn">
                <button className="signIn-btn">
                  Log In
                </button>
              </a>
            </li>
          </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
