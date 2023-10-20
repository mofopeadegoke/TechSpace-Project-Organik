import "./styles/footer.css";
import InstagramIcon from "../assests/insta-icon.png";
import FacebookIcon from "../assests/facebook-icon.png";
import TwitterIcon from "../assests/twitter-icon.png";
export default function Footer() {
    return (
        <>
            <article className="footer">
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
                    <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing </p>
                    <div className="socials-row">
                        <img src={InstagramIcon} alt="The Instagram icon on a green background" />
                        <img src={FacebookIcon} alt="The Facebook icon on a green background" />
                        <img src={TwitterIcon} alt="The Twitter icon on a green background" />
                    </div>
                </article>
                <article className="quick-links">
                    <h3>Quick Links</h3>
                    <a href="#">Team</a>
                    <a href="#">How To</a>
                    <a href="#">News</a>
                    <a href="#">About</a>
                    <a href="#">Login</a>
                    <a href="#">Sign Up</a>
                </article>
            </article>
        </>
    )
}