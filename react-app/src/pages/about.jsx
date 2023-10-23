import titlebg from '../assets/aboutbg.png';
import TitleImage from '../components/title-image';
import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import '../styles/about.css';
import IconText from '../components/icon-text';
import PrimaryColoredBtn from '../components/primary-colored-btn';

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

export default function AboutPage() {
    return (
        <>
            <article className='aboutPage-main'>
                <TitleImage text='About Us' imageUrl={titlebg} />
                <article className='about-section-one'>
                    
                </article>
                <article className='about-section-two'>
                    <article className='contentLeft'>
                        <img className='about-image' src={about1} alt='tomatos in a blow' />
                    </article>
                    <article className='contentRight'>
                        <p className="curvy-text green-text">
                            About Us
                        </p>
                        <h1 className='about-title-text'>We do Creative <br />Things for Success</h1>
                        <p className='about-discription'>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. <br />
                            <br />Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
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
                        <p className='about-discription'>Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard  the 1500s, when an unknown</p>
                        <article className='icon-text-container'>
                            <IconText2 imageUrl={icon3} primaryText="100% Natural Product" secondaryText="Simply dummy text of the printing and typesetting industry Lorem Ipsum" />
                            <IconText2 imageUrl={icon3} primaryText=" Increases resistance" secondaryText="Filling, and temptingly healthy, our Biona Organic Granola with Wild Berries is just the thing" />
                        </article>
                    </article>
                    <article className='contentRight'>
                        <img className='about-image2' src={about2} alt='tomatos in a blow' />
                    </article>
                    </article>
                    <article className='about-section-three-below'>
                        <IconText3 imageUrl={icon6} text="Return Policy" subtext="Simply dummy text of the printintypesetting industry." />
                        <IconText3 imageUrl={icon5} text="100% Fresh" subtext="Simply dummy text of the printintypesetting industry." />
                        <IconText3 imageUrl={icon4} text="Support 24/7" subtext="Simply dummy text of the printintypesetting industry." />
                        <IconText3 imageUrl={icon7} text="Secured Payment" subtext="Simply dummy text of the printintypesetting industry." />
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
                
                <Subscribe />
            </article>
        </>
    )
}