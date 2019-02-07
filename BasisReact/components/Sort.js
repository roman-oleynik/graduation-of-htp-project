import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Product from './goods';

import "./Sort.css";


// import Card from './itemCard';
// import Form from './newGood';

class TableInnerData extends React.Component {
    sortData = (EO) => {
        this.props.sortData(EO)
    }
    render() {
        return <React.Fragment>
            <tr className='TableHeader'>
                <td><NavLink to={`${this.props.nameSortMode === 1 ? "SortNameDec" : this.props.nameSortMode === 2 ? "SortNameInc" : ""}`}><td className={`TableHeaderName ${this.props.nameSortMode === 1 ? "SortInc" : this.props.nameSortMode === 2 ? "SortDec" : ""}`} onClick={this.sortData}>{`Name ${this.props.nameSortMode === 1 ? "▲" : this.props.nameSortMode === 2 ? "▼" : ""}`}</td></NavLink></td>
                <td><NavLink to={`${this.props.priceSortMode === 1 ? "SortPriceDec" : this.props.priceSortMode === 2 ? "SortPriceInc" : ""}`}><td className={`TableHeaderPrice ${this.props.priceSortMode === 1 ? "SortInc" : this.props.priceSortMode === 2 ? "SortDec" : ""}`} onClick={this.sortData}>{`Price ${this.props.priceSortMode === 1 ? "▲" : this.props.priceSortMode === 2 ? "▼" : ""}`}</td></NavLink></td>
                <td><NavLink to={`${this.props.urlSortMode === 1 ? "SortPictureDec" : this.props.urlSortMode === 2 ? "SortPictureInc" : ""}`}><td className={`TableHeaderPicture ${this.props.urlSortMode === 1 ? "SortInc" : this.props.urlSortMode === 2 ? "SortDec" : ""}`} onClick={this.sortData}>{`Picture ${this.props.urlSortMode === 1 ? "▲" : this.props.urlSortMode === 2 ? "▼" : ""}`}</td></NavLink></td>
                <td><NavLink to={`${this.props.leftSortMode === 1 ? "SortLeftDec" : this.props.leftSortMode === 2 ? "SortLeftInc" : ""}`}><td className={`TableHeaderLeft ${this.props.leftSortMode === 1 ? "SortInc" : this.props.leftSortMode === 2 ? "SortDec" : ""}`} onClick={this.sortData}>{`Left ${this.props.leftSortMode === 1 ? "▲" : this.props.leftSortMode === 2 ? "▼" : ""}`}</td></NavLink></td>

                <td className='TableHeaderLeft'>Edit</td>
                <td className='TableHeaderLeft'>Delete</td>
            </tr>
            
            {   
                this.props.nameSortMode === null && this.props.priceSortMode === null && this.props.urlSortMode === null && this.props.leftSortMode === null &&
               
                this.props.products.map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            {   
                this.props.nameSortMode === 1 && this.props.priceSortMode === null && this.props.urlSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((el, i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            {   
                this.props.nameSortMode === 2 && this.props.priceSortMode === null && this.props.urlSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }


            {   
                this.props.priceSortMode === 1 && this.props.nameSortMode === null && this.props.urlSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            {   
                this.props.priceSortMode === 2 && this.props.nameSortMode === null && this.props.urlSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }


            {   
                this.props.urlSortMode === 1 && this.props.priceSortMode === null && this.props.nameSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            {   
                this.props.urlSortMode === 2 && this.props.priceSortMode === null && this.props.nameSortMode === null && this.props.leftSortMode === null &&
                this.props.products.sort((a,b) => (a.url < b.url) ? 1 : ((b.url < a.url) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }


            {   
                this.props.leftSortMode === 1 && this.props.priceSortMode === null && this.props.urlSortMode === null && this.props.nameSortMode === null &&
                this.props.products.sort((a,b) => (a.left > b.left) ? 1 : ((b.left < a.left) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            {   
                this.props.leftSortMode === 2 && this.props.priceSortMode === null && this.props.urlSortMode === null && this.props.nameSortMode === null &&
                this.props.products.sort((a,b) => (a.left < b.left) ? 1 : ((b.left < a.left) ? -1 : 0)).map((el,i) => {
                    return <Product
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
                        arrayIndex= {i}
                    />
                })
            }
            
        </React.Fragment> 
        
    }
}

export default TableInnerData;