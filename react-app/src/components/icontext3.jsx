import './styles/icon-text3.css';

export default function IconText3 ({ imageUrl, text, subtext }) {
  return(
    <article className="image-title-subtext">
      <article className="image-container">
        <img src={imageUrl} alt="icon" />
      </article>
        <article className="text-container">
            <h2 className="title">{text}</h2>
            <p className="subtext">{subtext}</p>
        </article>
    </article>
  );
}