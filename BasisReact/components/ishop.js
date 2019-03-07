import React from 'react';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './ishop.css';

import TableInnerData from './TableInnerData';
import Header from './Header';
import HeaderHome from './HeaderHome';
import HeaderAbout from './HeaderAbout';
import HomePage from './HomePage';
import About from './About';
import BuyModeForm from './BuyModeForm';
import CardOfSelectedGood from './CardOfSelectedGood';
import Footer from './Footer';

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
        // filterCategoriesMode: "all",
        categoriesOpened: false,
        cart: [],
        cartPrice: 0,
        cartOpened: false,
        buyMode: false,
        
    };

    fetchError = (errorMessage) => {
        console.log(errorMessage);
      };
    
    fetchSuccess = (loadedData) => {
        this.setState({
          dataReady:true,
          products: loadedData,
          filteredProducts: loadedData
        });
        let partOfLink = window.location.href.match(/\/goods\/\S{0,20}/g).join('');
        let category = partOfLink.split('').slice(7).join('');
        this.switchFilterCategoriesMode(category);
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
            page,
            markedItem: null

        })
    };

    switchCategoryMode = () => {
        if (this.state.buyMode === false) {
            this.state.categoriesOpened === false ?
            this.setState({
                categoriesOpened: true,
                markedItem: null,
                cartOpened: false,
            })
            :
            this.setState({
                categoriesOpened: false,
                markedItem: null,

            });
        }
        
    }

    switchFilterCategoriesMode = (filterCategoriesMode) => {
        this.state.buyMode === false && this.state.filterCategoriesMode !== filterCategoriesMode 
        &&
        this.setState({
            spaMode: 'nav-goods',
            filterCategoriesMode,
            categoriesOpened: false,
        
        })
        this.filterByCategory(filterCategoriesMode);
    };
    
    filterByCategory = (category) => {
        let prodArr = [...this.state.products];
        let prodArrFiltered = prodArr.filter (el => {
            return el.subcategory === category || category === 'all';
        });

        this.state.buyMode === false &&
        this.setState({
            page:1,            
            filterMode: true,
            spaMode: 'nav-goods',
            filteredProducts: prodArrFiltered
        })
    }

    changeSPAMode = (spaMode) => {
        this.state.buyMode === false &&
        this.setState({
            markedItem: null,
            spaMode,
        })
    };

    searchByName = (value) => {
        let prodArr = [...this.state.products];
        let prodArrFiltered = prodArr.filter (el => {
            return el.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;  // algorythm of search
        })
        this.setState({
            page:1,  
            filterCriterion: value,
            filterMode: true,
            spaMode: 'nav-goods',
            filteredProducts: prodArrFiltered,
            markedItem: null,
            categoriesOpened: false,
        });
        if (value === "") {
            this.setState({
                markedItem: null,
                filterMode: false,
            })
        }
    };

    createSearchBar = () => {
        this.state.searchBarState === false &&
        this.setState({
            markedItem: null,
            searchBarState: true,
        })
    }
    closeSearchBar = () => {
        this.state.searchBarState === true &&
        this.setState({
            markedItem: null,
            searchBarState: false,
        });
    }

    turnOffSearchMode = () => {
        this.state.buyMode === false &&
        this.setState({
            markedItem: null,
            filterMode: false,
        })
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
        else this.state.buyMode === false && 
            this.setState({
                cart: [...this.state.cart, selectedProduct],
                markedItem: null,
            })
        
    };

    closeFilterCategoriesMode = () => {
        this.setState({
            // filterCategoriesMode: 'all',
            categoriesOpened: false,
            filterMode: false,
            markedItem: null,
        })
    }

    openTheCart = () => {
        this.state.cartOpened === false
        ?
        this.setState({
            cartOpened: true,
            markedItem: null,
            categoriesOpened: false,
        })
        :
        this.setState({
            cartOpened: false,
            markedItem: null,

        })
    }

    cleanCart = () => {
        this.state.buyMode === false &&
        this.setState({
            cart: [],
            markedItem: null,
        })
    }

    closeModals = () => {
        this.setState({
            categoriesOpened: false,
            cartOpened: false
        })
    }
    render() {        
        return <div className='App'>
                    {/* {
                        this.state.buyMode === true 
                        ?
                        <BuyModeForm
                            buyModeOff = {this.buyModeOff}
                            submitData = {this.submitData}
                        />
                        :
                        null
                    } */}
                    <Route 
                        path={`/goods/:subcategory`} 
                        render={(props)=><Header
                            page = {this.state.page}
                            closeModals = {this.closeModals}
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
                            cartPrice = {this.state.cartPrice}
                            cartOpened = {this.state.cartOpened}
                            openTheCart = {this.openTheCart}
                            cleanCart = {this.cleanCart}
                            buyModeOn = {this.buyModeOn}
                            {...props}
                        />       
                        }
                    />
                     
                    <Route path='/' exact   
                        render={(props)=><React.Fragment><HeaderHome
                            page = {this.state.page}
                            closeModals = {this.closeModals}
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
                            cartPrice = {this.state.cartPrice}
                            cartOpened = {this.state.cartOpened}
                            openTheCart = {this.openTheCart}
                            cleanCart = {this.cleanCart}
                            buyModeOn = {this.buyModeOn}
                            {...props}
                        />       
                        <HomePage {...props} />
                        </React.Fragment>
                        }
                    />
            
                    <div className='MarketBlock' onClick={this.closeModals}>
                        <div className='AppContainer'>
                            <div className='ProductsListAndButton'>
                                <div className='ProductsList'>
                                        
                                        <Route 
                                            path={`/goods/:subcategory`} 
                                            render={(props)=><TableInnerData  
                                                loadingFinished= {this.state.loadingFinished}
                                                products = {this.state.products}
                                                filteredProducts = {this.state.filteredProducts}
                                                filterMode = {this.state.filterMode}
                                                filterByCategory = {this.filterByCategory}
                                                switchFilterCategoriesMode = {this.switchFilterCategoriesMode}
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
                                    
                                </div>
                            </div>

                            <CardOfSelectedGood 
                                products = {this.state.products}
                                selected = {this.state.markedItem}
                            />
                        </div>
                </div> 
                
                <Route path='/about' exact   
                        render={(props)=><React.Fragment><HeaderAbout
                            page = {this.state.page}
                            closeModals = {this.closeModals}
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
                            cartPrice = {this.state.cartPrice}
                            cartOpened = {this.state.cartOpened}
                            openTheCart = {this.openTheCart}
                            cleanCart = {this.cleanCart}
                            buyModeOn = {this.buyModeOn}
                            {...props}
                        />       
                        <About 
                        {...props}
                        />
                        </React.Fragment>
                        }
                    />
        </div>
        
        
            
    }
}

export default IShop;