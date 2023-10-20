import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import '../styles/login.css';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <article className='login'>
        <article className='login-container'>
            <h1 className='header-text'>Log In</h1>
            <p className='sub-text'>Don't have an account? <a href='/signUp'>Sign Up</a></p>
            <form onSubmit={handleSubmit}>
                <label className='textfield'>
                    Email:
                    <input className='input-field' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label className='textfield'>
                    Password:
                    
                        <input className='input-field' type={ 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* {showPassword ? (
                            <FaEyeSlash style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEye style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        )} */}
                    
                </label>
                <br />
                <PrimaryColoredBtn value='Log In' />
                <a className='forgot-password' href='#'>Forgot Password?</a>
            </form>
            </article>
        </article>
    );
}