import './styles/product-card.css';

export default function ProductCard(props) {
  return (
    <div className="product-card">
    <article className="product-card-header">
    <img className='card-image' src={props.image} alt={props.itemName} />
    <h3 className='card-title'>{props.itemName} <span>x{props.quantity}</span></h3>
    </article>
      <p className='total-price'>{props.price}</p>
    </div>
  );
}


