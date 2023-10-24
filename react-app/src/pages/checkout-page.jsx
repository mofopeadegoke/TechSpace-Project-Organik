import React, { useState } from 'react';
import axios from 'axios';
import '../styles/checkout-page.css';
import Navbar from '../components/navbar';
import TitleImage from '../components/title-image';
import titlebg from '../assets/aboutbg.png';
import OrderSummary from '../components/order-summery';

export default function CheckoutPage() {
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    country: '',
    state: '',
    zipCode: '',
    email: '',
    phoneNumber: '',
  });

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [orderSummary, setOrderSummary] = useState({/* Your order summary data */});
  const [error, setError] = useState('');

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!billingData.firstName || !billingData.lastName || !billingData.streetName ||
        !billingData.country || !billingData.state || !billingData.zipCode ||
        !billingData.email || !billingData.phoneNumber) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('DUNA_API_ENDPOINT', {
        billingData,
        additionalInfo,
        orderSummary,
      });

      console.log('Order placed successfully:', response.data);

        // Clear form fields
      setBillingData({
        firstName: '',
        lastName: '',
        streetName: '',
        country: '',
        state: '',
        zipCode: '',
        email: '',
        phoneNumber: '',
      });
      setAdditionalInfo('');
      setError('');
      setOrderSummary({/* Clear order summary data */});
    } catch (error) {
      console.error('Error placing the order:', error);
      setError('Error placing the order. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <TitleImage text='Checkout' imageUrl={titlebg} />
    <article className="checkout-page">
    <article className="checkout-page-container">
      <article className="billing-form">
        <h2 className='header-text-leftside'>Billing Information</h2>
        {/* <hr className='hor-line'/> */}
        <form onSubmit={handleSubmit}>
          <label className='textfield-label'>
            First Name
            <input
              type="text"
              name="firstName"
              placeholder='First name'
              value={billingData.firstName}
              onChange={handleBillingInputChange}
              required
            />
          </label>

          <label className='textfield-label'>
            last Name
            <input
              type="text"
              name="lastName"
                placeholder="Last name"
              value={billingData.lastName}
              onChange={handleBillingInputChange}
              required
            />
          </label>
          <br/>
          <label className='textfield-label'>
            Street Address
            <input
              type="text"
              name="streetName"
              placeholder="Street address"
              value={billingData.streetName}
              onChange={handleBillingInputChange}
              required
            />
          </label>
          <br/>
          <label className='textfield-label'>
            Country/Region
            <input
              type="country"
              name="country"
              placeholder="Country/Region"
              value={billingData.country}
              onChange={handleBillingInputChange}
              required
            />
          </label>

          <label className='textfield-label'>
            States
            <input
              type="states"
              name="state"
              placeholder="State"
              value={billingData.state}
              onChange={handleBillingInputChange}
              required
            />
          </label>
          <label className='textfield-label'>
            Zip Code
            <input className='zip-code'
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={billingData.zipCode}
              onChange={handleBillingInputChange}
              required
            />
          </label>
          <br/>
          <label className='textfield-label'>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={billingData.email}
              onChange={handleBillingInputChange}
              required
            />
          </label>

          <label className='textfield-label'>
            Phone Number
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={billingData.phoneNumber}
              onChange={handleBillingInputChange}
              required
            />
          </label>
        </form>
        {error && <article className="error-message">{error}</article>}
      </article>

      <article className="additional-info">
      <hr className='hor-line'/>
        <h2 className='sutitle-text'>Additional Information (Optional)</h2>
        <h3 className='text3'>Order Notes(Optional)</h3>
        <textarea className='textarea-space'
          name="additionalInfo"
          placeholder='Notes about your order, e.g. special notes for delivery'
          value={additionalInfo}
          onChange={handleAdditionalInfoChange}
        />
      </article>
    </article>

      <article className="order-summary-section">
        <OrderSummary />
        <button className='place-order-btn' type="submit">Place Order</button>
      </article>
    </article>
    </>
  );
}


