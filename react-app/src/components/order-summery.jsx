import '../components/styles/order-summery.css';
import ProductCard from './product-card';
import bellpepper from '../assets/bellpepper.png';

export default function OrderSummary() {
    return (
        <>
            <article className="order-summary">
                <article className="order-summary-header">
                    <h2 className="header-title">Order Summary</h2>
                    <article className="order-summary-items">
                        <ProductCard image={bellpepper} itemName="Product Name" quantity={3} price={19.99} />
                        <ProductCard image={bellpepper} itemName="Product Name" quantity={3} price={19.99} />
                    </article>

                    <article className="total-section">
                        <p className="order-text">Subtotal:</p>
                        <p className="total-price">$84.00</p>
                    </article>
                    <hr className='h-line' />
                    <article className="total-section">
                        <p className="order-text">Shipping</p>
                        <p className="total-price">Free</p>
                    </article>
                    <hr className='h-line' />
                    <article className="total-section">
                        <p className="order-text">Total</p>
                        <p className="total-price big-bold">$1,000</p>
                    </article>
                </article>
            </article>
        </>
    );
};


