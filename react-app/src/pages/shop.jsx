import "../styles/shop.css"
import TitleImage from "../components/title-image"
import titlebg from '../assets/aboutbg.png';
import darkSearchIcon from "../assets/dark-search-icon.png";
import customerSupportIcon from "../assets/customer-support-img.png";
import shippingIcon from "../assets/shipping-icon.png";
import shoppingBagIcon from "../assets/shopping-bag.png";
import rightArrow from "../assets/green-right-arrow.png";
import SingleCategoryCard from "../components/single-category-card";
export default function ShopPage() {
    return (
        <>
            <article className="shop-page-main">
                <TitleImage text='Shop Product' imageUrl={titlebg} />
                <form className="search-container" method="POST">
                    <img src={darkSearchIcon} alt="A magnifying icon with dark brown outline" />
                    <input type="text"/>
                    <span>Search...</span>
                </form>
                <article className="features-container">
                    <article className="feature">
                        <img src={shippingIcon} alt="A truck icon" />
                        <article className="text">
                            <p>Free Shipping</p>
                            <p>Free Shipping on all your order</p>
                        </article>
                    </article>
                    <article className="feature">
                        <img src={customerSupportIcon} alt="Headsets icon" />
                        <article className="text">
                            <p>Customer Support 24/7</p>
                            <p>Instant access to Support</p>
                        </article>
                    </article>
                    <article className="feature">
                        <img src={shoppingBagIcon} alt="A shopping bag icon" />
                        <article className="text">
                            <p>100% Secure Payment</p>
                            <p>We ensure your money is save</p>
                        </article>
                    </article>
                </article>
                <article className="section-one">
                    <div className="row">
                        <h2>Popular Categories</h2>
                        <p className="green-text">View All <img src={rightArrow} alt="A green arrow pointing to the right" /></p>
                    </div>
                    <article className="category-container">
                        
                    </article>
                </article>
            </article>
        </>
    )
}