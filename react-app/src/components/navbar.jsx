import "./styles/navbar.css"
import CartIcon from "../assests/Cart Icon.png";
import Logo from "../assests/Logo.png";
import SearchIcon from "../assests/Search Icon.png";
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="#">
                            <img src={Logo} alt="The organization's logo which is a leaf" className="logo"/>
                            <span className="logo-txt">
                                Organick
                            </span>
                        </a>
                    </li>
                    <div className="nav-left">
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="#">
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
                            <a href="#">
                                <button className="signIn-btn">
                                    Sign In
                                </button>
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    )
}