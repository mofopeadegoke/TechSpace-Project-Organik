import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/home";
import axios from "axios";
import AboutPage from "./pages/about";

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
        <Navbar />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
