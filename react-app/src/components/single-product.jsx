import "./styles/single-product.css";
import Rating from "./rating"
export default function SingleProduct(props) {
    return (
        <>
            <article className="single-product" id={props.uniqueId}>
                <article className="category">
                    {props.category}
                </article>
                <img src={props.imgUrl} alt={props.altText} className="product-img" />
                <article className="footer">
                    <p className="product-name">{props.name}</p>
                    <article className="product-details">
                        <p className="product-price">
                            {props.price}
                        </p>
                        <Rating/>
                    </article>
                </article>
            </article>
        </>
    )
}