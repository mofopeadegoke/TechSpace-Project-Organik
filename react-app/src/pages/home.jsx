import "../styles/home.css";
import PrimaryColoredBtn from "../components/primary-colored-btn";
import cardImgOne from "../assests/home-section-two-cardImg-one.jpg";
import cardImgTwo from "../assests/home-section-two-cardImg-two.jpg";
import ImgCards from "../components/image-cards";
export default function HomePage() {
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
                    <ImgCards imgUrl={cardImgOne} curvyText="Natural!!" mainCardTxt="Get Garden Fresh Fruits"/>
                    <ImgCards imgUrl={cardImgTwo} curvyText="Natural!!" mainCardTxt="Get Garden Fresh Fruits"/>
                </article>
            </article>
        </>
    )
}