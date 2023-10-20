import "../styles/home.css";
import PrimaryColoredBtn from "../components/primary-colored-btn";
import PrimaryColoredDarkBtn from "../components/primary-colored-dark-btn";
import SingleProduct from "../components/single-product";
import Basket from "../assests/basket.png";
import FoodBowl from "../assests/vegan.png";
import MailBox from "../assests/mailbox.png";
import brocolliImg from "../assests/brocolli.png"
import cucumberImg from "../assests/cucumber.png"
import onionImg from "../assests/onion.png"
import cutOnionImg from "../assests/cutOnion.png"
import Subscribe from "../components/subscribe";
export default function HomePage() {
    console.log("★")
    return (
        <>
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
                        <p>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknownprinter took a galley.</p>
                        <article className="row">
                            <article className="img-container">
                                <img src={FoodBowl} alt="A food bowl icon" />
                            </article>
                            <article className="content">
                                <h3>Organic Foods Only</h3>
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                            </article>
                        </article>
                        <article className="row">
                            <article className="img-container">
                                <img src={MailBox} alt="A food bowl icon" />
                            </article>
                            <article className="content">
                                <h3>Quality Standards</h3>
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
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
        </>
    )
}