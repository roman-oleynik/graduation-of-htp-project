"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import IShop from './components/ishop';

import { BrowserRouter, Route, Link } from 'react-router-dom';

let productsList = [];
        
       
       
ReactDOM.render(
    <IShop products = {productsList} />
    ,            
    document.getElementById('container')
);
