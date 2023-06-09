import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import First from '../pages/First/First.js';
import Login from '../pages/Login/Login.js';
import SignUp from '../pages/SignUp/SignUp.js';

import Products from '../pages/Products/Products.js';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart.js';
import Perfil from '../pages/Perfil/Perfil.js';
import Payment from "../pages/Payment/Payment.js";

function PurchaseRoute() {
  return (
      <Routes>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/shoppingCart" element={<ShoppingCart/>}/>
        <Route exact path="/payment" element={<Payment/>}/>
      </Routes>
  );
}


function EntryRoute(){
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<First/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/purchase/*" element={<PurchaseRoute/>}/>
            <Route exact path="/perfil" element={<Perfil/>}/>
          </Routes>
        </BrowserRouter>
    );
}

export default EntryRoute;