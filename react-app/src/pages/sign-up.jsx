// import React, { useState } from 'react';
// import axios from 'axios';

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     // Initialize your form fields here
//     fieldName1: '',
//     fieldName2: '',
//     // Add more fields as needed
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/your-flask-route', formData);
//       console.log('Response from Flask:', response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="fieldName1"
//         value={formData.fieldName1}
//         onChange={handleInputChange}
//         placeholder="Field 1"
//       />
//       <input
//         type="text"
//         name="fieldName2"
//         value={formData.fieldName2}
//         onChange={handleInputChange}
//         placeholder="Field 2"
//       />
//       {/* Add more input fields as needed */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;


import React, { useState } from 'react';
import axios from 'axios';
import PrimaryColoredBtn from '../components/primary-colored-btn';
import '../styles/sign-up.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
          // Initialize your form fields here
          fullname: '',
          email: '',
          password: ''
        });

    const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };

    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post('http://127.0.0.1:5000/register', formData);
            console.log('Response from Flask:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
          setFormData({fullname: "", email: "", password: ""})
        };

    return (
        <article className='signup'>
        <article className='signup-container'>
            <h1 className='header-text'>Sign up now</h1>
            <form onSubmit={handleSubmit}>
                <label className='textfield'>
                    Full name
                    <input className='input-field' name='fullname' type="text" value={formData.fullname} onChange={handleInputChange} required/>
                </label>
                <label className='textfield'>
                    Email address
                    <input className='input-field' name='email' type="email" value={formData.email} onChange={handleInputChange} required/>
                </label>                
                <label className='textfield'>
                    Password
                    
                        <input className='input-field' name='password' type='password' value={formData.password} onChange={handleInputChange} required/>
                        {/* {showPassword ? (
                            <FaEyeSlash style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEye style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                        )} */}
                    
                </label>
                <br />
                <p className='sub-text'>By creating an account, I agree to our <a href='#'>Terms of use</a> and <a href='#'>Terms of use</a></p>
                <PrimaryColoredBtn type="submit" value='Sign up' />
                <p className='bottom-text'>Already have an account?<a className='forgot-password' href='/logIn'>Log in</a></p>
            </form>
            </article>
        </article>
    );
}