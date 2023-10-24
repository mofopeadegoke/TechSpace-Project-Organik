import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import axios from "axios";
import AboutPage from "./pages/about";
import ShopPage from "./pages/shop";
import LogIn from "./pages/log-in";
import SignUp from "./pages/sign-up";
import SingleCategory from "./pages/single-category";
import SingleProductPage from "./pages/single-product-page";
import SellerSignUp from "./pages/sellers-signup";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/singleproduct" element={<SingleProductPage />}></Route>
          <Route path="/logIn" element={<LogIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/sellerSignup" element={<SellerSignUp />}></Route>
          <Route path="/singleCategory" element={<SingleCategory />}></Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
