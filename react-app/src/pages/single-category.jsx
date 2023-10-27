import "../styles/single-category.css";
import darkSearchIcon from "../assets/dark-search-icon.png";
import TitleImage from "../components/title-image";
// import oilImg from "../assets/oil-category-img.png";
import brocolliImg from "../assets/brocolli.png"
import cucumberImg from "../assets/cucumber.png"
import onionImg from "../assets/onion.png"
import cutOnionImg from "../assets/cutOnion.png"
import TitleImg from "../assets/single-category-title-img.png";
import SingleProduct from "../components/single-product";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
export default function SingleCategory() {
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
            <article className="singleCategoryMain">
                <TitleImage imageUrl={TitleImg} text="Category Name"/>
                <form className="search-container" method="POST">
                    <img src={darkSearchIcon} alt="A magnifying icon with dark brown outline" />
                    <input type="text"/>
                    <span>Search...</span>
                </form>
                <article className="singleProductContainer">
                    <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage"/>
                        <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion" uniqueId="hidMobile"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Cabbage" uniqueId="hidMobile"/>
                </article>
            </article>
            <Footer />
        </article>}
        
        </>
    )
}