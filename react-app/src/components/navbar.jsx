import "./styles/navbar.css"
import CartIcon from "../assets/Cart Icon.png";
import Logo from "../assets/Logo.png";
import SearchIcon from "../assets/Search Icon.png";
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="\home">
                            <img src={Logo} alt="The organization's logo which is a leaf" className="logo"/>
                            <span className="logo-txt">
                                Organick
                            </span>
                        </a>
                    </li>
                    <div className="nav-left">
                        <li>
                            <a href="/home">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/shop">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="/about">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="search-container">
                                    <img src={SearchIcon} alt="Magnifying glasses in a green background" />
                                    <input type="text" placeholder="News" />
                                </div>
                            </a>
                        </li>
                        <li>
                            <div className="cart-container">
                                <img src={CartIcon} alt="A white shopping cart icon with a green background" />
                                <span>Cart(0)</span>
                            </div>
                        </li>
                        <li>
                            <a href="/logIn">
                                <button className="signIn-btn">
                                    Log In
                                </button>
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    )
}