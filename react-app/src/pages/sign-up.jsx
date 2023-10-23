import React, { useState } from 'react';
import axios from 'axios';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/notification';
import '../styles/sign-up.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullname: '',
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

            setFormData({ fullname: '', email: '', password: '' });
            setError('');
            setSuccess('Signup Successful! You can now log in.');
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
                            Full name
                            <input
                                className='input-field'
                                name='fullname'
                                type="text"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <br />

                        <label className='textfield'>
                            Email address
                            <input
                                className='input-field'
                                name='email'
                                type="email"
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
                        {error && <article className="error-message">{error}</article>}
                        <br />
                        <p className='sub-text'>By creating an account, I agree to our <a href='/home'>Terms of use</a> and <a href='/home'>Terms of use</a></p>
                        <PrimaryColoredBtn type="submit" value='Sign up' />
                        <p className='bottom-text'>Already have an account?<a className='forgot-password' href='/logIn'>Log in</a></p>
                    </form>
                </article>
                {success && (<Notification message={success} onClose={() => setSuccess('')} />)}
            </article>
        </>
    );
}
