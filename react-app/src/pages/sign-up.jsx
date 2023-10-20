import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import '../styles/sign-up.css';

export default function SignUp() {
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
        <article className='signup'>
        <article className='signup-container'>
            <h1 className='header-text'>Sign up now</h1>
            <form onSubmit={handleSubmit}>
                <label className='textfield'>
                    Full name
                    <input className='input-field' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className='textfield'>
                    Email address
                    <input className='input-field' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>                
                <label className='textfield'>
                    Password
                    
                        <input className='input-field' type={ 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* {showPassword ? (
                            <FaEyeSlash style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEye style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        )} */}
                    
                </label>
                <br />
                <p className='sub-text'>By creating an account, I agree to our <a href='#'>Terms of use</a> and <a href='#'>Terms of use</a></p>
                <PrimaryColoredBtn value='Sign up' />
                <p className='bottom-text'>Already have an account?<a className='forgot-password' href='/logIn'>Log in</a></p>
            </form>
            </article>
        </article>
    );
}