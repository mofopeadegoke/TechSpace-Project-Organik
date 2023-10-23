import React, { useState } from 'react';
import axios from 'axios';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/notification';
import '../styles/seller-signup.css';

export default function SellerSignUp() {
    const [formData, setFormData] = useState({
        fullname: '',
        companyName: '',
        phoneNumber: '',
        country: '', 
        zipcode: '', 
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const passwordCheck = (password) => {
        const passwordCheckCharacters = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordCheckCharacters.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordCheck(formData.password)) {
            setError('Password must be at least 8 characters with at least a letter and a number.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/register', formData);
            console.log('Response from Flask:', response.data);

            setFormData({
                fullname: '',
                companyName: '',
                phoneNumber: '',
                country: '',
                zipcode: '',
                email: '',
                password: ''
            });

            setError('');
            setSuccess('Sign up Successful! Redirecting to dashboard...');
            setTimeout(() => {
                setSuccess('');
                navigate('/shop');
            }, 3000);

        } catch (error) {
            console.error('Error:', error);

            if (error.response && error.response.status === 409) {
                setError('Email already exists. Please use a different email.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <>
            <article className='signup'>
                <article className='signup-container'>
                    <h1 className='header-text'>Sign up now</h1>
                    <form onSubmit={handleSubmit}>
                        <label className='textfield'>
                            Fullname
                            <input
                                className='input-field'
                                name='fullname'
                                type="text"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className='textfield'>
                            Company name 
                            <input
                                className='input-field'
                                name='companyName'
                                type="text"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className='textfield'>
                            Phone number
                            <input
                                className='input-field'
                                name='phoneNumber'
                                type="text"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className='textfield'>
                            Country 
                            <input
                                className='input-field'
                                name='country'
                                type="text"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className='textfield'>
                            Zipcode
                            <input
                                className='input-field'
                                name='zipcode'
                                type="text"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className='textfield'>
                            Email
                            <input
                                className='input-field'
                                name='email'
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

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
                        {error && <article className="error-message">{error}</article>}
                        <br />
                        <p className='sub-text'>By creating an account, I agree to our <a href='/home'>Terms of use</a> and <a href='/home'>Terms of use</a></p>
                        <PrimaryColoredBtn type="submit" value='Sign up' />
                    </form>
                    <article className='bottom-section'>
                        <p className='bottom-text'>Already have an account?<a className='forgot-password' href='/logIn'>Log in</a></p>
                    
                    </article>
                </article>
                {success && (<Notification message={success} onClose={() => setSuccess('')} />)}
            </article>
        </>
    );
}
