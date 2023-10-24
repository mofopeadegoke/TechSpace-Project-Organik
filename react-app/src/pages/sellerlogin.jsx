
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrimaryColoredBtn from '../components/primary-colored-btn';
import '../styles/login.css';
import Notification from '../components/notification'; // Make sure to import the Notification component

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Response from Flask:', response.data);
      setFormData({ email: '', password: '' });
      setError('');
      setSuccessMessage('Login Successful ✅');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/home');
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password. Please try again.');
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

  return (
    <>
      <article className='login'>
      {successMessage && (
            <Notification message={successMessage} onClose={() => setSuccessMessage('')} />
          )}
        <article className='login-container'>
          <h1 className='header-text'>Seller Login</h1>
          <p className='sub-text'>
            Don't have an account? <a href='/sellerSignup'>Sign Up</a>
          </p>
          <form onSubmit={handleSubmit}>
            <label className='textfield'>
              Email address
              <input
                className='input-field'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>

            <br />

            <label className='textfield'>
              Password
              <input
                className='input-field'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
            {error && <article className='error-message'>{error}</article>}

            <br />
            <PrimaryColoredBtn value='Log In' type='submit' />
            
           
            
          </form>
        </article>
      </article>
    </>
  );
}
