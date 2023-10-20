import './styles/subscribe.css';
import background from '../assests/subscribe.png';

export default function Subscribe() {
    return (
            <article className='subscribe' style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',}}>
                <article className='subscribe-text'>
                    <h1 className='subscribe-title'>Subscribe to newsletter</h1>
                    <div className="subscribe-input">
                                <input id="emailInput" type="text" placeholder="Enter your email" />
                                <button className='subscribe-btn'>Subscribe</button>
                            </div>
                            </article>
                </article>
    )
}