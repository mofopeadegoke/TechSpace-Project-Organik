import './styles/icontext2.css';

export default function IconText2 ({ imageUrl, primaryText, secondaryText }) {
    return (
      <article className='icontext2'>
        <article className='icon-container'>
          <img src={imageUrl} alt='a circle icon'/> 
          <article className='primary-text'>{primaryText}</article>
        </article>
        <article className='text-container'>
          <article className='secondary-text'>{secondaryText}</article>
        </article>
      </article>
    );
  };