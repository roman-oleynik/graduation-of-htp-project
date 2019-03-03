import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './ishop.css';

import TableInnerData from './TableInnerData';
import Header from './Header';
import HomePage from './HomePage';
import About from './About';
import BuyModeForm from './BuyModeForm';
import CardOfSelectedGood from './CardOfSelectedGood';

import Product from './goods';
import Card from './itemCard';
import Form from './newGood';

class IShop extends React.Component {
    state = {
        page: 1,
        products: [],
        searchBarState: false,
        filteredProducts: [],
        filterMode: false,
        filterCriterion: "",
        markedItem: null,
        dataReady: false,
        filterCategoriesMode: "all",
        categoriesOpened: false,
        cart: [],
        cartOpened: false,
        buyMode: false,
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
        this.state.buyMode === false &&
        this.setState({
            markedItem:id,
        })
    };

    goToPage = (page) => {
        this.state.buyMode === false &&
        this.setState({
            page
        })
    };

    switchCategoryMode = () => {
        if (this.state.buyMode === false) {
            this.state.categoriesOpened === false ?
            this.setState({
                categoriesOpened: true
            })
            :
            this.setState({
                categoriesOpened: false
            });
        }
        
    }

    switchFilterCategoriesMode = (filterCategoriesMode) => {
        this.state.buyMode === false && this.state.filterCategoriesMode !== filterCategoriesMode 
        &&
        this.setState({
            spaMode: 'nav-goods',
            filterCategoriesMode,
            categoriesOpened: false
        })
        this.filterByCategory(filterCategoriesMode);
    };

    filterByCategory = (category) => {
        console.log(category)
        let prodArr = [...this.state.products];
        let prodArrFiltered = prodArr.filter (el => {
            return el.subcategory === category;  // algorythm of search
        });
        this.state.buyMode === false &&
        this.setState({
            page:1,  // check how will it work with 2 and more pages of filtered content
            
            filterMode: true,
            spaMode: 'nav-goods',
            filteredProducts: prodArrFiltered
        })
    }

    changeSPAMode = (spaMode) => {
        this.state.buyMode === false &&
        this.setState({
            spaMode
        })
    };

    searchByName = (value) => {
        
        console.log(value)
        let prodArr = [...this.state.products];
        let prodArrFiltered = prodArr.filter (el => {
            return el.name === value;  // algorythm of search
        })
        console.log(prodArrFiltered)
        this.setState({
            page:1,  // check how will it work with 2 and more pages of filtered content
            filterCriterion: value,
            filterMode: true,
            spaMode: 'nav-goods',
            filteredProducts: prodArrFiltered,
            filterCategoriesMode: "all",
            categoriesOpened:false,
        })
        if (value === "") {
            this.setState({
                filterMode: false
            })
        }
    };

    createSearchBar = () => {
        this.state.searchBarState === false &&
        this.setState({
            searchBarState: true,
        })
    }
    closeSearchBar = () => {
        this.state.searchBarState === true &&
        this.setState({
            searchBarState: false,
        });
    }

    turnOffSearchMode = () => {
        this.state.buyMode === false &&
        this.setState({
            filterMode: false
        })
    }

    goToPageLeft = () => {
        if(this.state.buyMode === false && this.state.page !== 1) {
            this.setState({
                page: this.state.page-1
            })
        }
    }
    goToPageRight = () => {
        console.log(this.state.page)
        console.log(Math.ceil(this.state.products.length/10))
        if (this.state.buyMode === false && this.state.filterMode === true) {
            if (this.state.page <= Math.ceil(this.state.filteredProducts.lenght/10)) {
                this.setState({
                    page: this.state.page+1
                })
            }
        } else {
            if (this.state.buyMode === false && this.state.page !== Math.ceil(this.state.products.lenght/10)) {
                this.setState({
                    page: this.state.page+1
                })
            }
        }
        
    }
    prodAddToCart = (id) => {
        let selectedProduct = this.state.products.find(e=> {
            return e.code === id
        });
        let repeatChecking = this.state.cart.some(el => {
            return el.id === selectedProduct.id
        });        
        if(repeatChecking === true) {
            alert('You have already added this good to cart!');
            return;
        } 
        else this.state.buyMode === false && this.setState({
            cart: [...this.state.cart, selectedProduct]
        })
        
        
    }

    closeFilterCategoriesMode = () => {
        this.setState({
            filterCategoriesMode:'all',
            categoriesOpened: false,
            filterMode:false
        })
    }

    openTheCart = () => {
        this.state.cartOpened === false
        ?
        this.setState({
            cartOpened: true
        })
        :
        this.setState({
            cartOpened: false
        })
    }

    cleanCart = () => {
        this.state.buyMode === false &&
        this.setState({
            cart: []
        })
    }

    buyModeOn = () => {
        this.setState({
            buyMode: true
        })
    }
    
    buyModeOff = () => {
        this.setState({
            buyMode: false
        })
    }

    submitData = () => {
        let data = this.state.cart.map(el => {
            return el.name;
        })
        alert(data + " are bougth!");
        this.setState({
            cart: [],
        })
    }

    closeModals = () => {
        this.setState({
            categoriesOpened: false,
            cartOpened: false,
            searchBarState: false
        })
    }
    render() {        
        return <div className='App'>
                    {
                        this.state.buyMode === true 
                        ?
                        <BuyModeForm
                            buyModeOff = {this.buyModeOff}
                            submitData = {this.submitData}
                        />
                        :
                        null
                    }
                    <Header
                        createSearchBar = {this.createSearchBar}
                        closeSearchBar = {this.closeSearchBar}
                        searchBarState = {this.state.searchBarState}
                        filterCategoriesMode = {this.state.filterCategoriesMode}
                        switchFilterCategoriesMode = {this.switchFilterCategoriesMode}
                        changeSPAMode = {this.changeSPAMode}
                        spaMode = {this.state.spaMode}
                        searchByName = {this.searchByName}
                        turnOffSearchMode = {this.turnOffSearchMode}
                        categoriesOpened = {this.state.categoriesOpened}
                        switchCategoryMode = {this.switchCategoryMode}
                        closeFilterCategoriesMode = {this.closeFilterCategoriesMode}
                        cart = {this.state.cart}
                        cartOpened = {this.state.cartOpened}
                        openTheCart = {this.openTheCart}
                        cleanCart = {this.cleanCart}
                        buyModeOn = {this.buyModeOn}
                    />        
                    <Route path='/' exact  component={HomePage} />
            
                    <div className='MarketBlock' onClick={this.closeModals}>
                        <div className='AppContainer'>
                            <div className='ProductsListAndButton'>
                                <div className='ProductsList'>
                                    {   
                                        <Route 
                                            path={`/goods`} 
                                            render={(props)=><TableInnerData                                                    goToPage = {this.goToPage}
                                                page = {this.state.page}
                                                loadingFinished= {this.state.loadingFinished}
                                                products = {this.state.products}
                                                filteredProducts = {this.state.filteredProducts}
                                                filterMode = {this.state.filterMode}
                                                markItem = {this.markItem}
                                                prodAddToCart = {this.prodAddToCart}
                                                selected = {this.state.markedItem}
                                                dataReady={this.state.dataReady}
                                                goToPage = {this.goToPage}
                                                page = {this.state.page}
                                                goToPageLeft = {this.goToPageLeft}
                                                goToPageRight = {this.goToPageRight}
                                                {...props}
                                                />
                                            }
                                        /> 
                                    }
                                </div>
                            </div>

                            <CardOfSelectedGood 
                                products = {this.state.products}
                                selected = {this.state.markedItem}
                            />
                        </div>
                </div> 
                
                    <Route path={`/about`} 
                    render={
                    (props)=><About />
                    } 
                    />
        </div>
        
        
            
    }
}

export default IShop;