import './styles/title-image.css';

export default function TitleImage ({ imageUrl, text }) {
  return (
    <article className="title-image">
      <img src={imageUrl} alt="different veggies" className="title-image-bg" />
      <article className="title-text">{text}</article>
    </article>
  );
};

