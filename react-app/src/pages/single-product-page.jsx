import '../styles/singleproduct.css';
import TitleImage from '../components/title-image';
import titlebg from '../assets/single-product-titlebg.png';
import darkSearchIcon from "../assets/dark-search-icon.png";
import ProductDetails from '../components/product-details';
import brocolliImg from "../assets/brocolli.png"
import milletsImg from "../assets/millet.png";
import cucumberImg from "../assets/cucumber.png";
import onionImg from "../assets/onion.png";
import cutOnionImg from "../assets/cutOnion.png";
import SingleProduct from '../components/single-product';
import Subscribe from '../components/subscribe';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
export default function SingleProductPage() {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 7000);
  }, []);
    return (
        <>
        {isLoading ? <Loader /> : <article className="all">
            <Navbar />
            <article className="single-product-page">
                <TitleImage text='Single Product' imageUrl={titlebg} />
                <form className="search-container" method="POST">
                    <img src={darkSearchIcon} alt="A magnifying icon with dark brown outline" />
                    <input type="text"/>
                    <span>Search...</span>
                </form>
                <article className="single-product-cover">
                    <ProductDetails 
                        category="Millets" 
                        imgUrl={milletsImg} 
                        altText="A bowl of millets" 
                        title="Health Pistachios"
                        price="13.00"
                        description="Delicious and nutritious health pistachios that offers a wealth of health benefits. A convenient and satisfying snack that can be enjoyed anytime, making them a smart choice for a healthy lifestyle."
                        stock="12"                        
                        />
                    
                </article>
                <article className='section-two'>
                <h1 className='related-product'>Related Products</h1>
                <article className="products">
                        <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean" id="id10"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut" id="id1"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion" id="id2"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" id="id3"/>
                    </article>
                </article>
                <article className="subscribe">
                    <Subscribe />
                </article>
            </article>
            <Footer />
        </article>}
        
        </>
    )
}