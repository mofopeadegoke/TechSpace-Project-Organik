import "../styles/shop.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import TitleImage from "../components/title-image"
import titlebg from '../assets/shop-page-title-img.png';
import darkSearchIcon from "../assets/dark-search-icon.png";
import customerSupportIcon from "../assets/customer-support-img.png";
import shippingIcon from "../assets/shipping-icon.png";
import shoppingBagIcon from "../assets/shopping-bag.png";
import rightArrow from "../assets/green-right-arrow.png";
import freshFruitsImg from "../assets/fresh-fruit-category-img.png";
import freshVegetableImg from "../assets/fresh-vegatable-category-img.png";
import meatAndFishImg from "../assets/meatAndFish-category-img.png";
import snacksImg from "../assets/snacks-category-img.png";
import seaFoodImg from "../assets/sea-food-category-img.png";
import bakingNeedsImg from "../assets/baking-needs-category-img.png";
import diabeticFoodImg from "../assets/diabetic-food-category-img.png";
import oilImg from "../assets/oil-category-img.png";
import brocolliImg from "../assets/brocolli.png"
import cucumberImg from "../assets/cucumber.png"
import onionImg from "../assets/onion.png"
import cutOnionImg from "../assets/cutOnion.png"
import SingleCategoryCard from "../components/single-category-card";
import SingleProduct from "../components/single-product";
import Subscribe from "../components/subscribe";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loader from "../components/loader";
export default function ShopPage() {
    // useEffect(() => {
    //     async function handleRequest() {
    //         const response = await axios.get('http://127.0.0.1:5000/show_all_products');
    //         console.log(response)
    //     }
    // }, [])

    const [formData, setFormData] = useState({
        product: ''
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/search', formData);
            console.log('Response from Flask:', response.data);
            setFormData({product: ''});
        } catch (error) {
          console.error('Error:', error);          
        }
      };
    return (
        <>
            <Navbar />
            <article className="shop-page-main" id="home">
                <TitleImage text='Shop Product' imageUrl={titlebg} />
                <form className="search-container" onSubmit={handleSubmit}>
                    {/* <img src={darkSearchIcon} alt="A magnifying icon with dark brown outline" /> */}
                    <input type="text" name="product" value={formData.email} onChange={handleInputChange}/>
                    <span>Search...</span>
                    <button type="submit">Search</button>
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
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={freshFruitsImg} altText="Varieties of fresh fruits" name="Fresh Fruit"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={freshVegetableImg} altText="Varieties of fresh vegetables" name="Fresh Vegetables"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={meatAndFishImg}altText="Varieties of meat and fish" name="Meat & Fish"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={snacksImg} altText="Varieties of snacks" name="Snacks"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={seaFoodImg} altText="Varieties of sea foods" name="Sea Foods"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={bakingNeedsImg} altText="Varieties of baking materials" name="Baking Needs"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={diabeticFoodImg} altText="Varieties of diabetic foods" name="Diabetic Food"/>
                        </a>
                        <a href="/singleCategory">
                            <SingleCategoryCard imgUrl={oilImg} altText="Varieties of cooking oil" name="Oil"/>
                        </a>
                    </article>
                </article>
                <article className="section-two">
                    <div className="row">
                        <h2>Popular Products</h2>
                        <p className="green-text">View All <img src={rightArrow} alt="A green arrow pointing to the right" /></p>
                    </div>
                    <article className="products-container">
                        <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean" id="id9"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut" id="id1"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion" id="id2"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" id="id3"/>
                        <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean" uniqueId="hidMobile" id="id4"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut" uniqueId="hidMobile" id="id5"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion" uniqueId="hidMobile" id="id6"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" uniqueId="hidMobile" id="id7"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" uniqueId="hidMobile" id="id8"/>
                    </article>
                </article>
                <article className="section-three">
                    <Subscribe />
                </article>
            </article>
            <Footer />
        </>
    )
}