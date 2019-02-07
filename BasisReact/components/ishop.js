import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import './ishop.css';

import TableInnerData from './Sort';

import Product from './goods';
import Card from './itemCard';
import Form from './newGood';

class IShop extends React.Component {
    state = {
        products: [],
        markedItem: null,
        editedItem: null,
        buttonSubmitDisabled: true,
        appMode: 1,
        nameSortMode: window.location.href === "http://localhost:8080/SortNameInc" ? 1 : window.location.href === "http://localhost:8080/SortNameDec" ? 2 : null,
        priceSortMode: window.location.href === "http://localhost:8080/SortPriceInc" ? 1 : window.location.href === "http://localhost:8080/SortPriceDec" ? 2 : null,
        urlSortMode: window.location.href === "http://localhost:8080/SortPictureInc" ? 1 : window.location.href === "http://localhost:8080/SortPictureDec" ? 2 : null,
        leftSortMode: window.location.href === "http://localhost:8080/SortLeftInc" ? 1 : window.location.href === "http://localhost:8080/SortLeftDec" ? 2 : null,
        nameFieldValid: false,
        priceFieldValid: false,
        urlFieldValid: false,
        leftFieldValid: false,
        nameFieldValue: '',
        priceFieldValue: '',
        urlFieldValue: '',
        leftFieldValue: '',
        dataReady:false,
    };

    fetchError = (errorMessage) => {
        console.error(showStr);
      };
    
    fetchSuccess = (loadedData) => {
        this.setState({
          dataReady:true,
          products: loadedData
        });
    };

    componentDidMount = () => {
        isoFetch("http://localhost:3000/array", {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
        .then( (response) => {
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err; 
            }
            else
                return response.json(); 
        })
        .then( (data) => {
            try {
                this.fetchSuccess(data); 
            }
            catch ( error ){
                this.fetchError(error.message);
            }
        })
        .catch( (error) => {
            this.fetchError(error.userMessage||error.message);
        })


    }

    markItem = (id) => {
        this.setState({
            markedItem:id,
            nameFieldValue: '',
            priceFieldValue: '',
            urlFieldValue: '',
            leftFieldValue: '',
        })
    };


    addNewItem = () => {
        this.setState({
            appMode:2
        })
    };

    editItem = (id, i) => {
        this.setState({
            markedItem:id,
            appMode: 3,
            editedItem: id,
            nameFieldValue: this.state.products[i].name,
            priceFieldValue: this.state.products[i].price,
            urlFieldValue: this.state.products[i].url,
            leftFieldValue: this.state.products[i].left,
            nameFieldValid: true,
            priceFieldValid: true,
            urlFieldValid: true,
            leftFieldValid: true,
            buttonSubmitDisabled: false,
        });
    };

    deleteItem = (id) => {
        
        const conf = confirm('Do you really want to delete this item?');
        if (conf) {
            isoFetch("http://localhost:3000/array/" + id, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
            
            this.setState({
                products: this.state.products.filter(e => {
                    return e.code !== id
                })
            })
        }
    };

    validateField = (target) => {
        let inputName = target.name;
        let inputClassName = target.className;
        let inputValue = target.value;
        this.setState({
            [inputClassName]: inputValue
        });
        inputValue !== ""
        ?
        this.setState({
            [inputName] : true,
        }) 
        :
        this.setState({
            [inputName] : false
        });
        

        
        
        
    };

    sortData = (EO) => {
        if (this.state.appMode !== 1) {
            return;
        }
        
        let sortedProducts;
        this.setState({
            nameSortMode: null,
            priceSortMode: null,
            urlSortMode: null,
            leftSortMode: null
        });
        //sorting by "Name" field
        if (EO.target.className === `TableHeaderName ${this.state.nameSortMode === 1 ? "SortInc" : this.state.nameSortMode === 2 ? "SortDec" : ""}` && this.state.nameSortMode === null) {
            this.setState({
                nameSortMode: 1,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: null
            });
            
            sortedProducts = this.state.products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }  else if (EO.target.className === `TableHeaderName ${this.state.nameSortMode === 1 ? "SortInc" : this.state.nameSortMode === 2 ? "SortDec" : ""}` && this.state.nameSortMode === 1) {
            this.setState({
                nameSortMode: 2,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
        }   else if (EO.target.className === `TableHeaderName ${this.state.nameSortMode === 1 ? "SortInc" : this.state.nameSortMode === 2 ? "SortDec" : ""}` && this.state.nameSortMode === 2) {
            this.setState({
                nameSortMode: 1,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
        //sorting by "Price" field
        if (EO.target.className === `TableHeaderPrice ${this.state.priceSortMode === 1 ? "SortInc" : this.state.priceSortMode === 2 ? "SortDec" : ""}` && this.state.priceSortMode === null) {
            this.setState({
                nameSortMode: null,
                priceSortMode: 1,
                urlSortMode: null,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        }  else if (EO.target.className === `TableHeaderPrice ${this.state.priceSortMode === 1 ? "SortInc" : this.state.priceSortMode === 2 ? "SortDec" : ""}` && this.state.priceSortMode === 1) {
            this.setState({
                nameSortMode: null,
                priceSortMode: 2,
                urlSortMode: null,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
        }   else if (EO.target.className === `TableHeaderPrice ${this.state.priceSortMode === 1 ? "SortInc" : this.state.priceSortMode === 2 ? "SortDec" : ""}` && this.state.priceSortMode === 2) {
            this.setState({
                nameSortMode: null,
                priceSortMode: 1,
                urlSortMode: null,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        }
        //sorting by "Picture" field
        if (EO.target.className === `TableHeaderPicture ${this.state.urlSortMode === 1 ? "SortInc" : this.state.urlSortMode === 2 ? "SortDec" : ""}` && this.state.urlSortMode === null) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: 1,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0));
        }  else if (EO.target.className === `TableHeaderPicture ${this.state.urlSortMode === 1 ? "SortInc" : this.state.urlSortMode === 2 ? "SortDec" : ""}` && this.state.urlSortMode === 1) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: 2,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.url < b.url) ? 1 : ((b.url < a.url) ? -1 : 0));
        }   else if (EO.target.className === `TableHeaderPicture ${this.state.urlSortMode === 1 ? "SortInc" : this.state.urlSortMode === 2 ? "SortDec" : ""}` && this.state.urlSortMode === 2) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: 1,
                leftSortMode: null
            })
            sortedProducts = this.state.products.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0));
        }
        //sorting by "Left" field
        if (EO.target.className === `TableHeaderLeft ${this.state.leftSortMode === 1 ? "SortInc" : this.state.leftSortMode === 2 ? "SortDec" : ""}` && this.state.leftSortMode === null) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: 1
            })
            sortedProducts = this.state.products.sort((a,b) => (a.left > b.left) ? 1 : ((b.left > a.left) ? -1 : 0));
        }  else if (EO.target.className === `TableHeaderLeft ${this.state.leftSortMode === 1 ? "SortInc" : this.state.leftSortMode === 2 ? "SortDec" : ""}` && this.state.leftSortMode === 1) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: 2
            })
            sortedProducts = this.state.products.sort((a,b) => (a.left < b.left) ? 1 : ((b.left < a.left) ? -1 : 0));
        }   else if (EO.target.className === `TableHeaderLeft ${this.state.leftSortMode === 1 ? "SortInc" : this.state.leftSortMode === 2 ? "SortDec" : ""}` && this.state.leftSortMode === 2) {
            this.setState({
                nameSortMode: null,
                priceSortMode: null,
                urlSortMode: null,
                leftSortMode: 1
            })
            sortedProducts = this.state.products.sort((a,b) => (a.left > b.left) ? 1 : ((b.left > a.left) ? -1 : 0));
        }

        this.setState({
            products: sortedProducts
        })    
    }

    submitData = () => {
        
        if(this.state.appMode === 2 && this.state.nameFieldValid && this.state.priceFieldValid &&
            this.state.urlFieldValid && this.state.leftFieldValid) {
                this.setState({dataReady:false})
                console.log(this.state.products.length)
                let randomNum = Math.floor(Math.random()*10000);
                let newGood = {
                    name: this.state.nameFieldValue, 
                    key: randomNum, 
                    id: randomNum, 
                    code: randomNum, 
                    price: this.state.priceFieldValue, 
                    url: this.state.urlFieldValue, 
                    left: this.state.leftFieldValue
                };
                
                isoFetch("http://localhost:3000/array", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(newGood)
                })
                        .then( (response) => {
                            if (!response.ok) {
                                let Err=new Error("fetch error " + response.status);
                                Err.userMessage="Ошибка связи";
                                throw Err; 
                            }
                            else
                                return response.json(); 
                        })
                        .then( (data) => {
                            this.setState({
                                products: [...this.state.products, data],
                                appMode: 1,
                                nameFieldValid: false,
                                priceFieldValid: false,
                                urlFieldValid: false,
                                leftFieldValid: false,
                                nameFieldValue: '',
                                priceFieldValue: '',
                                urlFieldValue: '',
                                leftFieldValue: '',
                                markedItem: null,
                                buttonSubmitDisabled:true,
                                dataReady:true
                            })
                        })
                
        }
        else if (this.state.appMode === 3 && this.state.nameFieldValid && this.state.priceFieldValid &&
            this.state.urlFieldValid && this.state.leftFieldValid) {
                this.setState({dataReady:false})
                console.log(this.state.editedItem)
                let newGood = {
                    name: this.state.nameFieldValue, 
                    key: this.state.products, 
                    id: this.state.products, 
                    code: this.state.products, 
                    price: this.state.priceFieldValue, 
                    url: this.state.urlFieldValue, 
                    left: this.state.leftFieldValue
                };
                isoFetch("http://localhost:3000/array/" + this.state.editedItem, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    
                })
                isoFetch("http://localhost:3000/array", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(newGood)
                })
                .then( (response) => { 
                    if (!response.ok) {
                        let Err=new Error("fetch error " + response.status);
                        Err.userMessage="Ошибка связи";
                        throw Err; 
                    }
                    else
                        return response.json(); 
                })
                .then( (data) => {
                    
                    this.setState({
                        products: this.state.products.map( el => {
                            if (el.code === this.state.editedItem) {
                                return data;
    
                            } else {
                                return el;
                            }
                            
                            
                        }),
                        appMode: 1,
                        nameFieldValid: false,
                        priceFieldValid: false,
                        urlFieldValid: false,
                        leftFieldValid: false,
                        nameFieldValue: '',
                        priceFieldValue: '',
                        urlFieldValue: '',
                        leftFieldValue: '',
                        markedItem: null,
                        buttonSubmitDisabled:true,
                        dataReady:true
                    })
                })
                
        }
                 
        
    };

    canselForm = () => {
        this.setState({
            appMode: 1,
            nameFieldValid: false,
            priceFieldValid: false,
            urlFieldValid: false,
            leftFieldValid: false,
            nameFieldValue: '',
            priceFieldValue: '',
            urlFieldValue: '',
            leftFieldValue: '',
            buttonSubmitDisabled: true,
        })
    };
    
    render() {        
        return <div className='MarketBlock'>
                    
                    <h1 className='MarketTitle'>The Reactive Market</h1>
                    <p>Click two and more times to write down sort parameters to URL</p>
                    <div className='AppContainer'>
                        <div className='ProductsListAndButton'>
                            <div className='ProductsList'>
                                <table className='Table'>
                                    <tbody>
                                        {   
                                            this.state.dataReady === false ?
                                            <img src="img/preloader.gif" />:
                                            <Route 
                                                exact
                                                path='/' 
                                                render={
                                                (props)=><TableInnerData
                                                        loadingFinished= {this.state.loadingFinished}
                                                        products = {this.state.products}
                                                        markItem = {this.markItem}
                                                        editItem = {this.editItem}
                                                        deleteItem = {this.deleteItem}
                                                        sortData = {this.sortData}
                                                        selected = {this.state.markedItem}
                                                        appMode = {this.state.appMode}
                                                        nameSortMode= {this.state.nameSortMode}
                                                        priceSortMode= {this.state.priceSortMode}
                                                        urlSortMode= {this.state.urlSortMode}
                                                        leftSortMode= {this.state.leftSortMode}
                                                        dataReady={this.state.dataReady}
                                                        {...props}
                                                    />
                                                }
                                            /> 
                                        }
                                        {   
                                            
                                            <Route 
                                                exact
                                                path='/SortNameInc' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }

                                        {   
                                            <Route 
                                                exact
                                                path='/SortNameDec' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }


                                        {   
                                            <Route 
                                                exact
                                                path='/SortPriceInc' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }

                                        {   
                                            <Route 
                                                exact
                                                path='/SortPriceDec' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }


                                        {   
                                            <Route 
                                                exact
                                                path='/SortPictureInc' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }

                                        {   
                                            <Route 
                                                exact
                                                path='/SortPictureDec' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }




                                        {   
                                            <Route 
                                                exact
                                                path='/SortLeftInc' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }

                                        {   
                                            <Route 
                                                exact
                                                path='/SortLeftDec' 
                                                render={
                                                (props)=><TableInnerData
                                                    products = {this.state.products}
                                                    markItem = {this.markItem}
                                                    editItem = {this.editItem}
                                                    deleteItem = {this.deleteItem}
                                                    sortData = {this.sortData}
                                                    selected = {this.state.markedItem}
                                                    appMode = {this.state.appMode}
                                                    nameSortMode= {this.state.nameSortMode}
                                                    priceSortMode= {this.state.priceSortMode}
                                                    urlSortMode= {this.state.urlSortMode}
                                                    leftSortMode= {this.state.leftSortMode}
                                                    {...props}
                                                />
                                                }
                                            /> 
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <button className='NewLI' onClick={this.addNewItem}>Click to add new list item</button>
                            
                        </div>

                        <div className='CardAndFormBlock'>
                            <div className='CardBlock'>
                            {this.state.appMode === 1 && this.state.products.map( el => {
                                return <Card 
                                    itemName = {el.name}
                                    key = {el.code}
                                    id = {el.code}
                                    itemLeft = {el.left}
                                    itemPrice = {el.price}
                                    pictureUrl = {el.url}
                                    products = {this.props.products}
                                    markItem = {this.markItem}
                                    selected = {this.state.markedItem}
                                />
                            })}
                            </div>
                            <div className='FormBlock'>
                                {this.state.appMode === 2 &&
                                    <Form 
                                        dataReady={this.state.dataReady}
                                        newItemRequested = {this.state.newItemRequested}
                                        nameFieldValid = {this.state.nameFieldValid}
                                        priceFieldValid = {this.state.priceFieldValid}
                                        urlFieldValid = {this.state.urlFieldValid}
                                        leftFieldValid = {this.state.leftFieldValid}
                                        nameFieldValue = {this.state.nameFieldValue}
                                        priceFieldValue = {this.state.priceFieldValue}
                                        urlFieldValue = {this.state.urlFieldValue}
                                        leftFieldValue = {this.state.leftFieldValue}
                                        validateField = {this.validateField}
                                        products = {this.props.products} 
                                        selected = {this.state.markedItem}
                                        appMode = {this.state.appMode}
                                        submitData = {this.submitData}
                                        canselForm = {this.canselForm}
                                        disabled = {this.state.buttonSubmitDisabled}
                                    />
                                    }
                                    {this.state.appMode === 3 &&
                                    <Form 
                                        dataReady={this.state.dataReady}
                                        newItemRequested = {this.state.newItemRequested}
                                        nameFieldValid = {this.state.nameFieldValid}
                                        priceFieldValid = {this.state.priceFieldValid}
                                        urlFieldValid = {this.state.urlFieldValid}
                                        leftFieldValid = {this.state.leftFieldValid}
                                        nameFieldValue = {this.state.nameFieldValue}
                                        priceFieldValue = {this.state.priceFieldValue}
                                        urlFieldValue = {this.state.urlFieldValue}
                                        leftFieldValue = {this.state.leftFieldValue}
                                        validateField = {this.validateField}
                                        products = {this.props.products} 
                                        selected = {this.state.markedItem}
                                        editedItem = {this.state.editedItem}
                                        appMode = {this.state.appMode}
                                        submitData = {this.submitData}
                                        canselForm = {this.canselForm}
                                        disabled = {this.state.buttonSubmitDisabled}
                                    />
                                    }
                            </div>
                        </div>
                    </div>
               </div> 
    }
}

export default IShop;