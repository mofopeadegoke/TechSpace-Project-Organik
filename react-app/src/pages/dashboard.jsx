import React from 'react';
import '../styles/dashboard.css';
import Navbar from '../components/navbar';
import NewProduct from '../components/new-product';

export default function dashboard() {
  return (
    <>
    <Navbar />
        <article className='dashboard'>
        <NewProduct />
        </article>
    </>
    )
}