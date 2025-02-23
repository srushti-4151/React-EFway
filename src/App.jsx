import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSlider from "./components/HomeSlider";
import Home from "./pages/Home/Home";
import Productdetails from "./pages/Product-details/Productdetails";
import Product from "./pages/Product/Product";
import Shop from "./pages/Shop/Shop";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdetails/:name" element={<Productdetails />} />
          <Route path="/product/:name" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
