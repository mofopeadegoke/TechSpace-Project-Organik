import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/new-product.css';

export default function NewProduct() {
  const [productData, setProductData] = useState({
    productName: '',
    productId: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const user_id = localStorage.getItem('SellersId');
  console.log(user_id);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/add', productData);
      console.log('Product added successfully:', response.data);
      setProductData({
        productName: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
      });
      setSuccessMessage('Product added successfully ✅');
      setError('');

    } catch (error) {
      console.error('Error adding the product:', error);
      setError('Error adding the product. Please try again.');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    if (successMessage || error) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, error]);
  useEffect(() => {
    document.querySelector('.idInput').click();
  }, [])
  return (
    <article className='new-product'>
      <h2 className='new-title'>New Product</h2>
      <form className='new-form' onSubmit={handleSubmit} method='POST'>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="productName">Product Name</label>
          <input className='input-rigthside'
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            required
          />
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="category">Category</label>
          <select className='select-button'
            id="category"
            name="category"
            type="text"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Category 1">Fruits</option>
            <option value="Category 2">Vegetable</option>
            <option value="Category 3">Meat</option>
            <option value="Category 4">Fish</option>
            <option value="Category 5">Dairy</option>
            <option value="Category 6">Poultry</option>
            <option value="Category 7">Oil</option>
            <option value="Category 8">Grains</option>
          </select>
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="price">Price</label>
          <article>
          <span className='dollar-sign'>$</span>
          <input className='input-rigthside'
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
          </article>
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="quantity">Quantity</label>
          <input className='input-rigthside'
            type="text"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            required
          />
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="new-product-description">Description</label>
          <textarea
          className='diss-pad'
            id="description"
            name="description"
            placeholder='Enter product description...'
            value={productData.description}
            onChange={handleInputChange}
            required
          />
          </article>
          <input 
            type='hidden'
            name="user"
            className='idInput'
            value={user_id}
            onClick={handleInputChange}
          />
        <button className='add-product-btn' type="submit">Add Product</button>
      </form>
    </article>
  );
}
