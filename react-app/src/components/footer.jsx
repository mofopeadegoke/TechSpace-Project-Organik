import "./styles/footer.css";
import InstagramIcon from "../assets/insta-icon.png";
import FacebookIcon from "../assets/facebook-icon.png";
import TwitterIcon from "../assets/twitter-icon.png";
export default function Footer() {
    return (
        <>
            <article className="footerComponent">
                <article className="contact-content">
                    <h3>Contact</h3>
                    <div className="email-contact">
                        <h4>Email</h4>
                        <p>mofopeadegoke@gmail.com</p>
                    </div>
                    <div className="phone-contact">
                        <h4>Phone</h4>
                        <p>+905488548642</p>
                    </div>
                    <div className="address-contact">
                        <h4>Address</h4>
                        <p>88 road, borklyn street, USA</p>
                    </div>
                </article>
                <article className="company-text">
                    <h3>Organick</h3>
                    <p>"Farming Fresh, Feeding Future. Organic Goodness Delivered Daily, Rooted in Nature's Best. Taste the Difference with Us, Your Farm-to-Fork Choice!"</p>
                    <div className="socials-row">
                        <img src={InstagramIcon} alt="The Instagram icon on a green background" />
                        <img src={FacebookIcon} alt="The Facebook icon on a green background" />
                        <img src={TwitterIcon} alt="The Twitter icon on a green background" />
                    </div>
                </article>
                <article className="quick-links">
                    <h3>Quick Links</h3>
                    <a href="/about">About</a>
                    <a href="/login">Login</a>
                    <a href="/signUp">Sign Up</a>
                    <a href="/sellersSignUp">Sign Up as a Seller</a>
                </article>
            </article>
        </>
    )
}