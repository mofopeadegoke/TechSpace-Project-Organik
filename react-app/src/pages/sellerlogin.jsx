
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrimaryColoredBtn from '../components/primary-colored-btn';
import '../styles/login.css';
import Notification from '../components/notification'; // Make sure to import the Notification component
import IdComponent from "../components/id";
import Loader from "../components/loader"
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
      const response = await axios.post('http://127.0.0.1:5000/seller/login', formData);
      console.log('Response from Flask:', response.data);

      if (response.data.message === 'Login successful')  {
        setFormData({ email: '', password: '' });
        setError('');
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          localStorage.setItem('SellersId', response.data.user_id);
          navigate('/dashboard');
        }, 3000);
      } else {
        setError('Invalid email or password. Please try again.');
        setSuccessMessage('');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('An error occured. Please try again.');
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
    {isLoading ? <Loader /> : <article className="all">
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
            {/* <input type="hidden" name="userId" value={user_id} /> */}
            {error && <article className='error-message'>{error}</article>}

            <br />
            <PrimaryColoredBtn value='Log In' type='submit' />
            
           
            
          </form>
        </article>
      </article>
    </article>}
    </>
  );
}