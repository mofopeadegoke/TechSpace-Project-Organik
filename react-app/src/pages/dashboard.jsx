import React from 'react';
import '../styles/dashboard.css';
import Navbar from '../components/navbar';
import NewProduct from '../components/new-product';
import { useEffect, useState } from "react";
import Loader from "../components/loader";
export default function dashboard() {
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
        <Navbar />
        <article className='dashboard'>
        <NewProduct />
        </article>
    </article>}
    
    </>
    )
}