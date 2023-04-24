import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home.js';
import Login from '../pages/Login/Login.js';
import SignUp from "../pages/SignUp/SignUp.js";

function EntryRoute(){
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      );
}

export default EntryRoute;