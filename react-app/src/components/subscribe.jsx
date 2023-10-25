import './styles/subscribe.css';
import background from '../assets/subscribe.png';

export default function Subscribe() {
    return (
            <article className='subscribe' style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',}}>
                <article className='subscribe-text'>
                    <h1 className='subscribe-title'>Subscribe to newsletter</h1>
                    <form action='https://formspree.io/f/myyqodye' className="subscribe-input" method='POST'>
                        <input id="emailInput" placeholder="Enter your email" name='email' typeof='email'/>
                        <button className='subscribe-btn' type='submit'>Subscribe</button>
                    </form>
                    </article>
                </article>
    )
}

