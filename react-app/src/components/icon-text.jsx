import './styles/icon-text.css';

export default function IconText({imageUrl, text}) {
    return (
        <>
            <article className='icon-text'>
                <img className='icon' src={imageUrl} alt='icon'/>
                <p className='icon-on-text'>{text}</p>
            </article>
        </>
    )
}