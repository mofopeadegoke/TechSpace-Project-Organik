import React, { useState } from 'react';
import './styles/new-product.css';

export default function NewProduct() {
  const [productData, setProductData] = useState({
    productName: '',
    productId: '',
    category: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({
      ...productData,
      image: imageFile,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <article className='new-product'>
      <h2 className='new-title'>New Product</h2>
      <form className='new-form' onSubmit={handleSubmit}>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="image">Upload Image</label>
          <input className='input-rigthside'
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="productName">Product Name</label>
          <input className='input-rigthside'
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="productId">Product ID</label>
          <input className='input-rigthside'
            type="text"
            id="productId"
            name="productId"
            value={productData.productId}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-container'>
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
        </div>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="price">Price</label>
          <input className='input-rigthside'
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="quantity">Quantity</label>
          <input className='input-rigthside'
            type="text"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-container'>
          <label className='label-leftside' htmlFor="new-product-description">Description</label>
          <textarea
          className='diss-pad'
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          </div>
        <button className='add-product-btn' type="submit">Add Product</button>
      </form>
    </article>
  );
}
