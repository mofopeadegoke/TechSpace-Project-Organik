import React, { useState } from "react";
import Rating from "./rating";
import "./styles/product-details.css";
import './styles/notification.css';
import Notification from "./notification";

export default function ProductDetails(props) {
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState(null);

    const QuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const AddToCart = () => {
        console.log('Add to cart clicked for ', props.title, 'with quantity:', quantity);
        const message = 'Added ' + quantity + ' ' + props.title + ' to cart';
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        },3000);
      };

    return (
        <>
            <article className="single-product-container">
                <article className="single-product-details">
                    <article className="category">
                        {props.category}
                    </article>
                    <img src={props.imgUrl} alt={props.altText} className="product-img" />
                </article>
                <article className="products-description">
                <h2 className="product-title">{props.title}</h2>
                <Rating />
                <p className="product-price">${props.price}</p>
                <p className="product-full-description">{props.description}</p>
                <article className="quantity">
                    <label className="quantity-input" htmlFor="quantity">Quantity: 
                        <input type="number" name="quantity" value={quantity} id="quantity" min="1" onChange={QuantityChange} />
                    </label>
                    <button className="primary-btn" onClick={AddToCart} type="button" value="Add to Cart">Add To Cart</button>                    
                </article>
                <article className="stock-number">In-Stock: {props.stock}</article>
                </article>        
            </article>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        </>
    )
}