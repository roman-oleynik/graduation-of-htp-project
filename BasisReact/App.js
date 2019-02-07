"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import IShop from './components/ishop';

import { BrowserRouter, Route, NavLink } from 'react-router-dom';

let productsList = [];
        
       
       
ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={IShop} />
    </BrowserRouter>
    ,            
    document.getElementById('container')
);
