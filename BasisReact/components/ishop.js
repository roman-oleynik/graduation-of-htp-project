import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './ishop.css';

import TableInnerData from './Sort';
import PagesButtons from './PagesButtons';
import Header from './Header';
import HomePage from './HomePage';
import About from './About';

import Product from './goods';
import Card from './itemCard';
import Form from './newGood';

class IShop extends React.Component {
    state = {
        page: 1,
        products: [],
        filteredProducts: [],
        filterMode: false,
        filterCriterion: "",
        markedItem: null,
        editedItem: null,
        buttonSubmitDisabled: true,
        appMode: 1,
        // nameSortMode: window.location.href === "http://localhost:8080/SortNameInc" ? 1 : window.location.href === "http://localhost:8080/SortNameDec" ? 2 : null,
        // priceSortMode: window.location.href === "http://localhost:8080/SortPriceInc" ? 1 : window.location.href === "http://localhost:8080/SortPriceDec" ? 2 : null,
        // urlSortMode: window.location.href === "http://localhost:8080/SortPictureInc" ? 1 : window.location.href === "http://localhost:8080/SortPictureDec" ? 2 : null,
        // leftSortMode: window.location.href === "http://localhost:8080/SortLeftInc" ? 1 : window.location.href === "http://localhost:8080/SortLeftDec" ? 2 : null,
        nameFieldValid: false,
        priceFieldValid: false,
        urlFieldValid: false,
        leftFieldValid: false,
        nameFieldValue: '',
        priceFieldValue: '',
        urlFieldValue: '',
        leftFieldValue: '',
        dataReady: false,
        filterCategoriesMode: "all",
        spaMode: 'nav-home',
    };

    fetchError = (errorMessage) => {
        console.error(showStr);
      };
    
    fetchSuccess = (loadedData) => {
        this.setState({
          dataReady:true,
          products: loadedData,
          filteredProducts: loadedData
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


    // addNewItem = () => {
    //     this.setState({
    //         appMode:2
    //     })
    // };

    // editItem = (id, i) => {
    //     this.setState({
    //         markedItem:id,
    //         appMode: 3,
    //         editedItem: id,
    //         nameFieldValue: this.state.products[i].name,
    //         priceFieldValue: this.state.products[i].price,
    //         urlFieldValue: this.state.products[i].url,
    //         leftFieldValue: this.state.products[i].left,
    //         nameFieldValid: true,
    //         priceFieldValid: true,
    //         urlFieldValid: true,
    //         leftFieldValid: true,
    //         buttonSubmitDisabled: false,
    //     });
    // };

    // deleteItem = (id) => {
        
    //     const conf = confirm('Do you really want to delete this item?');
    //     if (conf) {
    //         isoFetch("http://localhost:3000/array/" + id, {
    //             method: 'delete',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //             },
    //         })
            
    //         this.setState({
    //             products: this.state.products.filter(e => {
    //                 return e.code !== id
    //             }),
    //             page: 1
    //         })
    //     }
    // };

    // validateField = (target) => {
    //     let inputName = target.name;
    //     let inputClassName = target.className;
    //     let inputValue = target.value;
    //     this.setState({
    //         [inputClassName]: inputValue
    //     });
    //     inputValue !== ""
    //     ?
    //     this.setState({
    //         [inputName] : true,
    //     }) 
    //     :
    //     this.setState({
    //         [inputName] : false
    //     });
        

        
        
        
    // };

    

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
                let newGood = {
                    name: this.state.nameFieldValue, 
                    key: this.state.editedItem, 
                    id: this.state.editedItem, 
                    code: this.state.editedItem, 
                    price: this.state.priceFieldValue, 
                    url: this.state.urlFieldValue, 
                    left: this.state.leftFieldValue
                };
                
                isoFetch("http://localhost:3000/array/" + this.state.editedItem, {
                    method: 'put',
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
                    console.log(data);
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

    goToPage = (page) => {
        console.log(page)
        this.setState({
            page
        })
    };

    switchFilterCategoriesMode = (filterCategoriesMode) => {
        this.state.filterCategoriesMode !== filterCategoriesMode 
        &&
        this.setState({
            spaMode: 2,
            filterCategoriesMode
        })
    };

    changeSPAMode = (spaMode) => {
        this.setState({
            spaMode
        })
    };

    searchByName = (value) => {
        
        console.log(value)
        let prodArr = [...this.state.products];
        let prodArrFiltered = prodArr.filter (el => {
            return el.name === value;
        })
        console.log(prodArrFiltered)
        this.setState({
            filterCriterion: value,
            filterMode: true,
            spaMode: 'nav-goods',
            filteredProducts: prodArrFiltered
        })
    };
    
    render() {        
        return <React.Fragment>
            <Header
                filterCategoriesMode = {this.state.filterCategoriesMode}
                switchFilterCategoriesMode = {this.switchFilterCategoriesMode}
                changeSPAMode = {this.changeSPAMode}
                searchByName = {this.searchByName}
            />
            {
            this.state.spaMode === 'nav-home' 
            ?
            <React.Fragment>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </React.Fragment>
            :
            this.state.spaMode === 'nav-goods' 
            ?
                <BrowserRouter>
                <div className='MarketBlock'>
                        <div className='AppContainer'>
                            <div className='ProductsListAndButton'>
                                <div className='ProductsList'>
                                    {/* {
                                        this.state.filterMode === true && this.state.filterCriterion !== "" &&
                                        <span>Search results by criterion: "{this.state.filterCriterion}"</span>
                                    } */}
                                            {   
                                                this.state.dataReady === false ?
                                                <img src="img/preloader.gif" />:
                                                <Route 
                                                    exact
                                                    path={`/`} 
                                                    render={
                                                    (props)=><TableInnerData
                                                            goToPage = {this.goToPage}
                                                            page = {this.state.page}
                                                            loadingFinished= {this.state.loadingFinished}
                                                            products = {this.state.products}
                                                            filteredProducts = {this.state.filteredProducts}
                                                            filterMode = {this.state.filterMode}
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
                                            
                                </div>

                                <PagesButtons 
                                    goToPage = {this.goToPage}
                                    page = {this.state.page}
                                    products = {this.state.products}
                                />

                                <button className='NewLI' onClick={this.addNewItem}>Click to add new list item</button>
                                
                            </div>

                            <div className='CardAndFormBlock'>
                                {/* <div className='CardBlock'>
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
                                </div> */}
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
                </BrowserRouter>
                :
                this.state.spaMode === 'nav-about'
                ?
                <BrowserRouter>
                    <About />
                </BrowserRouter>
                : 
                null
            }
        </React.Fragment>
        
        
            
    }
}

export default IShop;