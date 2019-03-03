"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import IShop from './components/ishop';

import { BrowserRouter, Route, Link } from 'react-router-dom';

let productsList = [];
        
       
       
ReactDOM.render(
    <BrowserRouter>
        <IShop products = {productsList} />
    </BrowserRouter>
    
    ,            
    document.getElementById('container')
);
