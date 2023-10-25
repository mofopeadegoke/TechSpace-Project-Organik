import Navbar from "../components/navbar";
import TitleImage from "../components/title-image";
import Footer from "../components/footer";
import titlebg from '../assets/aboutbg.png';
import greenPepperImg from "../assets/green-pepper.png";
import redPepperImg from "../assets/red-pepper.png";
import "../styles/shopping-cart.css";
export default function ShoppingCartPage() {
    return (
        <>
            <Navbar />
            <TitleImage text='Shopping Cart' imageUrl={titlebg} />
            <article className="shopping-cart-main">
                <article className="row">
                    <article className="left-product-container">
                        <article className="product-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Product
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Quantity
                                        </th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>
                                        <article className="product-name">
                                            <img src={greenPepperImg} alt="Two Green Capsicums" />
                                            <span>Green Capsicum</span>
                                        </article>
                                    </td>
                                    <td>
                                        $14.00
                                    </td>
                                    <td>
                                        <article className="order-btn-row">
                                            <button>-</button>
                                            <p className="value">5</p>
                                            <button>+</button>
                                        </article>
                                    </td>
                                    <td>
                                        $70.00
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <article className="product-name">
                                            <img src={redPepperImg} alt="Two Red Capsicums" />
                                            <span>Red Capsicum</span>
                                        </article>
                                    </td>
                                    <td>
                                        $14.00
                                    </td>
                                    <td>
                                        <article className="order-btn-row">
                                            <button>-</button>
                                            <p className="value">5</p>
                                            <button>+</button>
                                        </article>
                                    </td>
                                    <td>
                                        $70.00
                                    </td>
                                </tr>
                            </table>
                        </article>
                        <button>Clear</button>
                    </article>
                    <article className="right-product-container">
                        <p>Cart Totals</p>
                        <article className="main-container">
                            <div className="row">
                                <p>Subtotals:</p>
                                <p>$84.00</p>
                            </div>
                            <div className="row">
                                <p>Totals:</p>
                                <p>84.00</p>
                            </div>
                            <div className="checkout-row">
                                <input type="checkbox" />
                                <p>Shipping & taxes calculated at checkout</p>
                            </div>
                            <a href="/checkout">
                                <button>
                                    Proceed to Checkout
                                </button>
                            </a>
                        </article>
                    </article>
                </article>
            </article>
            <Footer />
        </>
    )
}