import titlebg from '../assets/about-bg.png';
import TitleImage from '../components/title-image';
import about1 from '../assets/about-img1 (1).png';
import about2 from '../assets/Photo (6).png';
import '../styles/about.css';
import IconText from '../components/icon-text';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import icon1 from '../assets/about-icon1.svg';
import icon2 from '../assets/about-icon2.svg';
import icon3 from '../assets/about-icon3.svg';
import icon4 from '../assets/about-icon4.svg';
import icon5 from '../assets/about-icon5.svg';
import icon6 from '../assets/about-icon6.svg';
import icon7 from '../assets/about-icon7.svg';
import profile1 from '../assets/profile1.png';
import IconText2 from '../components/icontext2';
import IconText3 from '../components/icontext3';
import Subscribe from '../components/subscribe';
import ProfileCard from '../components/profile-card';
import { useEffect, useState } from "react";
import Loader from "../components/loader";
export default function AboutPage() {
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
            <article className='aboutPage-main'>
                <TitleImage text='About Us' imageUrl={titlebg} />
                <article className='about-section-one'>
                    
                </article>
                <article className='about-section-two'>
                    <article className='contentLeft'>
                        <img className='about-image' src={about1} alt='pomegranate tree' />
                    </article>
                    <article className='contentRight'>
                        <p className="curvy-text green-text">
                            About Us
                        </p>
                        <h1 className='about-title-text'>We do Creative <br />Things for Success</h1>
                        <p className='about-discription'>At the heart of our mission, we foster creativity to pave the way for success. Our dedicated team is driven to innovate and inspire, continually pushing boundaries to achieve excellence. <br />
                            <br />In the realm of agri-food tech, we harness creativity to drive success. Our web app is a testament to our commitment to innovative solutions that empower the agriculture and food technology sectors for a sustainable future.</p>
                        <article className='icon-text-container'>
                            <IconText imageUrl={icon1} text="Modern Agriculture Equipment" />
                            <IconText imageUrl={icon2} text="No growth hormones are used" />
                        </article>
                        <PrimaryColoredBtn value="Explore More" />
                    </article>
                </article>

                <article className='about-section-three'>
                    <article className='about-section-three-above'>
                    <article className='contentLeft'>
                        <p className="curvy-text green-text">
                            Why Choose us?
                        </p>
                        <h1 className='about-title-text'>We do not buy from the<br /> open market & traders.</h1>
                        <p className='about-discription'>We take pride in our commitment to sourcing directly from accredited farmers and producers, bypassing the open market and traders. This approach ensures the highest quality and traceability in our products, promoting transparency, fairness, and the support of local agricultural communities.</p>
                        <article className='icon-text-container'>
                            <IconText2 imageUrl={icon3} primaryText="100% Natural Product" secondaryText="providing you with completely natural products means that you can trust in the purest and most wholesome ingredients in every item we offer." />
                            <IconText2 imageUrl={icon3} primaryText=" Increases resistance" secondaryText="Our products are carefully formulated to enhance your body's natural resistance, promoting better health and overall well-being." />
                        </article>
                    </article>
                    <article className='contentRight'>
                        <img className='about-image2' src={about2} alt='tomatos in a blow' />
                    </article>
                    </article>
                    <article className='about-section-three-below'>
                        <IconText3 imageUrl={icon6} text="Return Policy" subtext="Your satisfaction is our priority" />
                        <IconText3 imageUrl={icon5} text="100% Fresh" subtext=" Delivering quality you can taste with every bite" />
                        <IconText3 imageUrl={icon4} text="Support 24/7" subtext=" We're here for you around the clock." />
                        <IconText3 imageUrl={icon7} text="Secured Payment" subtext="We safeguard your financial transactions." />
                    </article>
                </article>
                
                <article className='about-section-four'>
                    <p className="curvy-text green-text">
                        Team</p>
                    <h1 className='about-title-text'>Our Organic Experts</h1>
                    <p className='about-discription'>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </p>
                        <article className='profile-card-container'>
                        <ProfileCard 
                        imageUrl={profile1}
                        altText='profile image'
                        name='John Doe'
                        designation='CEO'
                        instagramUrl='https://www.instagram.com/'
                        twitterUrl='https://twitter.com/'
                    />
                    <ProfileCard 
                        imageUrl={profile1}
                        altText='profile image'
                        name='John Doe'
                        designation='CEO'
                        instagramUrl='https://www.instagram.com/'
                        twitterUrl='https://twitter.com/'
                    />
                    <ProfileCard 
                        imageUrl={profile1}
                        altText='profile image'
                        name='John Doe'
                        designation='CEO'
                        instagramUrl='https://www.instagram.com/'
                        twitterUrl='https://twitter.com/'
                    />
                        </article>
                    
                </article>
                <article className='about-section-five'>
                <Subscribe />
                </article>
            </article>
            <Footer />
        </article>}
        
        </>
    )
}