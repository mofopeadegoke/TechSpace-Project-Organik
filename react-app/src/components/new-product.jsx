import React, { useState } from 'react';
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
      const response = await axios.post('http://127.0.0.1:5000/products', productData);
      console.log('Product added successfully:', response.data);

      setProductData({
        productName: '',
        productId: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding the product:', error);
    }
  };

  return (
    <article className='new-product'>
      <h2 className='new-title'>New Product</h2>
      <form className='new-form' onSubmit={handleSubmit}>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="productName">Product Name</label>
          <input className='input-rigthside'
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
          />
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="category">Category</label>
          <select className='select-button'
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
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
          <input className='input-rigthside'
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="quantity">Quantity</label>
          <input className='input-rigthside'
            type="text"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          />
        </article>
        <article className='flex-container'>
          <label className='label-leftside' htmlFor="new-product-description">Description</label>
          <textarea
          className='diss-pad'
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          </article>
        <button className='add-product-btn' type="submit">Add Product</button>
      </form>
    </article>
  );
}
