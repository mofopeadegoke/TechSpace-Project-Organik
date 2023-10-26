import Navbar from "../components/navbar";
import TitleImage from "../components/title-image";
import Footer from "../components/footer";
import titlebg from '../assets/aboutbg.png';
import greenPepperImg from "../assets/green-pepper.png";
import redPepperImg from "../assets/red-pepper.png";
import "../styles/shopping-cart.css";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
export default function ShoppingCartPage() {
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);

    const increaseCount1 = () => {
        setCount1(count1 + 1);
    };

    const decreaseCount1 = () => {
        if (count1 <= 0) {
            return;
        }
        setCount1(count1 - 1);
    };

    const increaseCount2 = () => {
        setCount2(count2 + 1);
    };

    const decreaseCount2 = () => {
        if (count2 <= 0) {
            return;
        }
        setCount2(count2 - 1);
    };
    const clearValue = () => {
        setCount1(0);
        setCount2(0);
    }
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
                                            <button onClick={decreaseCount1}>-</button>
                                            <p className="value">{count1}</p>
                                            <button onClick={increaseCount1}>+</button>
                                        </article>
                                    </td>
                                    <td>
                                        {"$" + count1*14}
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
                                            <button onClick={decreaseCount2}>-</button>
                                            <p className="value">{count2}</p>
                                            <button onClick={increaseCount2}>+</button>
                                        </article>
                                    </td>
                                    <td>
                                        {"$" + count2*14}
                                    </td>
                                </tr>
                            </table>
                        </article>
                        <button onClick={clearValue}>Clear</button>
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