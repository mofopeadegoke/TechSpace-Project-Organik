import Navbar from "../components/navbar";
import TitleImage from "../components/title-image";
import Footer from "../components/footer";
import titlebg from '../assets/aboutbg.png';
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
                                        <img src="" alt="" />
                                        Green Capsicum
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
                </article>
            </article>
            <Footer />
        </>
    )
}