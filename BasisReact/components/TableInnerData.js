import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Product from './goods';
import PagesButtons from './PagesButtons';


import "./TableInnerData.css";


// import Card from './itemCard';
// import Form from './newGood';

class TableInnerData extends React.Component {
    sortData = (EO) => {
        this.props.sortData(EO)
    }
    
    render() {
        return this.props.dataReady === false 
        ?
        <img className='Preloader' src="img/preloader.gif" />
        :
        <React.Fragment>    
            {   
                this.props.filterMode === true
                ?
                this.props.filteredProducts.map((el,i) => {
                    
                    return <Product
                        page = {this.props.page}
                        prodPage = {Math.floor(i/10)}
                        className = "TableItem" 
                        itemName = {el.name}
                        key = {el.code}
                        id = {el.code}
                        itemLeft = {el.left}
                        itemPrice = {el.price}
                        pictureUrl = {el.url}
                        products = {this.props.products}
                        markItem = {this.props.markItem}
                        editItem = {this.props.editItem}
                        deleteItem = {this.props.deleteItem}
                        selected = {this.props.selected}
                        appMode = {this.props.appMode}
                        prodAddToCart = {this.props.prodAddToCart}
                        arrayIndex= {i}
                    />
                })
                :
                this.props.products.map((el,i) => {
                    
                    return <Product
                        page = {this.props.page}
                        prodPage = {Math.floor(i/10)}
                        className = "TableItem" 
                        itemName = {el.name}
                        key = {el.code}
                        id = {el.code}
                        itemLeft = {el.left}
                        itemPrice = {el.price}
                        pictureUrl = {el.url}
                        products = {this.props.products}
                        markItem = {this.props.markItem}
                        editItem = {this.props.editItem}
                        deleteItem = {this.props.deleteItem}
                        selected = {this.props.selected}
                        appMode = {this.props.appMode}
                        prodAddToCart = {this.props.prodAddToCart}
                        arrayIndex= {i}
                    />
                })
                
            }
            <PagesButtons 
                goToPage = {this.props.goToPage}
                page = {this.props.page}
                products = {this.props.products}
                filteredProducts = {this.props.filteredProducts}
                filterMode = {this.props.filterMode}
                goToPageLeft = {this.props.goToPageLeft}
                goToPageRight = {this.props.goToPageRight}
            />
            
            
        </React.Fragment> 
        
    }
}

export default TableInnerData;