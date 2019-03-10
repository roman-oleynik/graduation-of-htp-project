import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Product from './goods';
import PagesButtons from './PagesButtons';
import ItemCard from './itemCard';

import "./stylesheets/TableInnerData.css";


class TableInnerData extends React.Component {
    sortData = (EO) => {
        this.props.sortData(EO)
    }
    
    render() {
        let subcategory = this.props.match.params.subcategory;
        
        let filteredProducts = this.props.products.filter (el => el.subcategory === subcategory || subcategory === 'all');
        return this.props.dataReady === false && this.props.networkErrorMessage === null
        ?
        <img className='Preloader' src="https://cdn.cssauthor.com/wp-content/uploads/2018/06/Animated-Loading-%C3%97-1.gif" />
        :
            <div className='TableAndPagination'>
                <PagesButtons 
                    goToPage = {this.props.goToPage}
                    page = {this.props.page}
                    products = {this.props.products}
                    filteredProducts = {this.props.filteredProducts}
                    routedSubcategory = {subcategory}
                    filterMode = {this.props.filterMode}
                    goToPageLeft = {this.props.goToPageLeft}
                    goToPageRight = {this.props.goToPageRight}
                />
                {
                    (this.props.filterMode === true && this.props.filteredProducts.length == 0)
                    ?
                    <span className='NotFoundMessage'>Not Found</span>
                    :
                    null
                }
                <div className='TableInnerData'>    
                {   
                    this.props.filterMode === false && subcategory !== 'all'
                    ?
                    filteredProducts.map((el,i) => {
                        return <Product
                            page = {this.props.page}
                            prodPage = {Math.floor(i/50)}
                            className = "TableItem" 
                            itemName = {el.name}
                            key = {el.code}
                            id = {el.code}
                            itemLeft = {el.left}
                            itemPrice = {el.price}
                            pictureUrl = {el.url}
                            itemSubcategory = {el.subcategory}
                            routedSubcategory = {subcategory}
                            filterByCategory = {this.props.filterByCategory}
                            products = {this.props.products}
                            filteredProducts = {filteredProducts}
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
                    this.props.filterMode === true
                    ?
                    this.props.filteredProducts.map((el,i) => {
                        
                        return <Product
                            page = {this.props.page}
                            prodPage = {Math.floor(i/50)}
                            className = "TableItem" 
                            itemName = {el.name}
                            key = {el.code}
                            id = {el.code}
                            itemLeft = {el.left}
                            itemPrice = {el.price}
                            itemSubcategory = {el.subcategory}
                            routedSubcategory = {subcategory}
                            filterByCategory = {this.props.filterByCategory}
                            pictureUrl = {el.url}
                            products = {this.props.products}
                            filteredProducts = {filteredProducts}
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
                            prodPage = {Math.floor(i/50)}
                            className = "TableItem" 
                            itemName = {el.name}
                            key = {el.code}
                            id = {el.code}
                            itemLeft = {el.left}
                            itemPrice = {el.price}
                            itemSubcategory = {el.subcategory}
                            routedSubcategory = {subcategory}
                            filterByCategory = {this.props.filterByCategory}
                            pictureUrl = {el.url}
                            products = {this.props.products}
                            filteredProducts = {filteredProducts}
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
                <ItemCard 
                    products = {this.props.products}
                    filteredProducts = {filteredProducts}
                    selected = {this.props.selected} 
                />
            </div> 
                <PagesButtons 
                    goToPage = {this.props.goToPage}
                    page = {this.props.page}
                    products = {this.props.products}
                    filteredProducts = {this.props.filteredProducts}
                    routedSubcategory = {subcategory}
                    filterMode = {this.props.filterMode}
                    goToPageLeft = {this.props.goToPageLeft}
                    goToPageRight = {this.props.goToPageRight}
                />
            </div>
        
            
            
        
        
    }
}

export default TableInnerData;