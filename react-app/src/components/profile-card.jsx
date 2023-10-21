import './styles/profile-card.css';
import instagramIcon from '../assets/insta-icon.png';
import twitterIcon from '../assets/twitter-icon.png';

export default function ProfileCard(props) {
    return (
        <article className='profile'>
            <article className='profileImage'>
                <img src={props.imageUrl} alt={props.altText} className="profile-img" />
                <article className="profile-details">
                <article className="profile-leftside">
                    <p className="profile-name">{props.name}</p>
                    <p className="profile-designation curvy-text green-text">{props.designation}</p>
                    </article>
                    <article className="profile-social-links">
                        <a href={props.instagramUrl} target="_blank" rel="noreferrer">
                            <img className='iconimg' src={instagramIcon} alt="instagram" />
                        </a>
                        <a href={props.twitterUrl} target="_blank" rel="noreferrer">
                            <img className='iconimg' src={twitterIcon} alt="twitter" />
                        </a>
                    
                    </article>
                    
                </article>
            </article>
        </article>
    );
}