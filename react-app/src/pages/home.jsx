import "../styles/home.css";
import PrimaryColoredBtn from "../components/primary-colored-btn";
import PrimaryColoredDarkBtn from "../components/primary-colored-dark-btn";
import SingleProduct from "../components/single-product";
import Basket from "../assets/basket.png";
import FoodBowl from "../assets/vegan.png";
import MailBox from "../assets/mailbox.png";
import brocolliImg from "../assets/brocolli.png"
import cucumberImg from "../assets/cucumber.png"
import onionImg from "../assets/onion.png"
import cutOnionImg from "../assets/cutOnion.png"
import Subscribe from "../components/subscribe";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function HomePage() {
    return (
        <>
            <Navbar />
            <article className="homePage-main">
                <article className="section-one">
                    <article className="content">
                        <p className="curvy-text green-text">
                            100% Natural Food
                        </p>
                        <h1>Choose the best healthier way of life</h1>
                        <PrimaryColoredBtn value="Explore Now"/>
                    </article>
                </article>
                <article className="section-two">
                    <article className="img-card one">
                        <article className="content">
                            <p className="curvy-text white-text">
                                Natural!!
                            </p>
                            <h2>Get Garden Fresh Fruits</h2>
                        </article>
                    </article>
                    <article className="img-card two">
                        <article className="content">
                            <p className="curvy-text white-text">
                                Offer!!
                            </p>
                            <h2>Get 10% off on Vegetables</h2>
                        </article>
                    </article>
                </article>
                <article className="section-three">
                    <img src={Basket} alt="A basket of fruits" />
                    <article className="content">
                        <p className="curvy-text green-text">
                            About Us
                        </p>
                        <h2>We Believe in Working Accredited Farmers</h2>
                        <p>
                        At the core of our values, we wholeheartedly believe in supporting and collaborating with accredited farmers, forming enduring partnerships aimed at empowering them to not only attain but also surpass their goals. Our commitment goes beyond mere assistance; it's a dedication to nurturing their growth, fostering sustainable practices, and jointly realizing a thriving future in agriculture.</p>
                        <article className="row">
                            <article className="img-container">
                                <img src={FoodBowl} alt="A food bowl icon" />
                            </article>
                            <article className="content">
                                <h3>Organic Foods Only</h3>
                                <p>We offer a curated selection of only the finest organic products. Our mission is to promote health and sustainability by providing exclusively organic options to our customers.</p>
                            </article>
                        </article>
                        <article className="row">
                            <article className="img-container">
                                <img src={MailBox} alt="A food bowl icon" />
                            </article>
                            <article className="content">
                                <h3>Quality Standards</h3>
                                <p>Every product we offer meets the highest benchmarks for excellence. We take pride in our rigorous quality control measures, guaranteeing the utmost satisfaction for our customers.</p>
                            </article>
                        </article>
                        <PrimaryColoredBtn value="Shop Now"/>
                    </article>
                </article>
                <article className="section-four">
                    <p className="curvy-text">
                        Offer
                    </p>
                    <div className="row">
                        <p className="title-text">
                            We Offer Organic For You
                        </p>
                        <PrimaryColoredDarkBtn value="View All Product"/>
                    </div>
                    <article className="products">
                        <SingleProduct category="Vegetable" imgUrl={brocolliImg} altText="An image of brocolli" price="$11.00" name="Mung Bean"/>
                        <SingleProduct category="Vegetable" imgUrl={cucumberImg} altText="An image of a green hazelnut" price="$12.00" name="Brown Hazelnut"/>
                        <SingleProduct category="Vegetable" imgUrl={onionImg} altText="An image of onions" price="$17.00" name="Onion"/>
                        <SingleProduct category="Vegetable" imgUrl={cutOnionImg} altText="An image of cut open cabbage" price="$17.00" name="Caggage"/>
                    </article>
                </article>
                <article className="section-five">
                    <Subscribe />
                </article>
            </article>
            <Footer />
        </>
    )
}