import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import Cart from './Cart';

import './stylesheets/Header.css';

class Header extends React.Component {
    
    switchCategoryMode = (EO) => {
        this.props.switchCategoryMode()        
    };
    createSearchBar = () => {
        this.props.createSearchBar();
    };
    closeSearchBar = () => {
        this.props.closeSearchBar();
        this.props.turnOffSearchMode();
    };
    filterByCategory = (EO) => {
        this.props.switchFilterCategoriesMode(EO.target.id);
    };
    changeSPAMode = (EO) => {
        this.props.changeSPAMode(EO.target.id);
        this.props.closeModals();
    }
    searchByName = (EO) => {
        this.props.searchByName(EO.target.value);
    }
    closeFilterCategoriesMode = (EO) => {
        EO.stopPropagation();
        this.props.closeFilterCategoriesMode()
    }
    render () {
        let subcategory = this.props.match.params.subcategory;
        return <header className='Header-Container'>
            <div className='H-Navigation'>
                <nav className='App-Navigation'>
                    <ul className='App-Nav-Ul'>
                        <NavLink to="/" exact><li id='nav-home' className={`App-Nav-Li App-Nav-Li-Home`} onClick={this.changeSPAMode}>Home</li></NavLink>
                        <NavLink to={`/goods/all`}><li id='nav-goods' className={`App-Nav-Li App-Nav-Li-Goods`} onClick={this.changeSPAMode}>Goods</li></NavLink>
                        <NavLink to='/about'><li id='nav-about' className={`App-Nav-Li App-Nav-Li-About`} onClick={this.changeSPAMode}>About</li></NavLink>
                    </ul>
                </nav>
            </div>

            <hr className='Header-hr' />

            <div className='H-Container'>
                <div className={subcategory === 'all' ? `Header-Container__Categories` : "Header-Container__Categories Categories-Selected"} onClick={this.switchCategoryMode}>
                    <span className='Category-Display'>{subcategory === "all" ? "Categories" : subcategory}</span>
                    <div className='Categories-Buttons'>
                        {
                            subcategory !== 'all' ? <NavLink to='/goods/all' onClick={this.closeFilterCategoriesMode}>
                            <div className='Categories-Cross'>
                                <span className='CCross-1'></span>
                                <span className='CCross-2'></span>
                            </div>
                            </NavLink> : null
                        }
                        <div className={`Categories-Arrow${this.props.categoriesOpened === true ? "-Opened" : ""}`}>
                            <span className='Arrow-1'></span>
                            <span className='Arrow-2'></span>
                        </div>
                        

                    </div>
                    
                   
                </div>
                    {
                        this.props.categoriesOpened === true && <div className='Categories-Main-Container'>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Outerwear</span>
                                <NavLink to={'/goods/Coats'}><li id="Coats" className={`Categories-List-Item${subcategory === "Coats" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Coats</li></NavLink>
                                <NavLink to={'/goods/Jackets'}><li id="Jackets" className={`Categories-List-Item${subcategory === "Jackets" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Jackets</li></NavLink>
                                <NavLink to={'/goods/Cloaks'}><li id="Cloaks" className={`Categories-List-Item${subcategory === "Cloaks" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Cloaks</li></NavLink>
                                <NavLink to={'/goods/Winter-Jackets'}><li id="Winter-Jackets" className={`Categories-List-Item${subcategory === "Winter-Jackets" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Winter Jackets</li></NavLink>
                                <NavLink to={'/goods/Windbreakers'}><li id="Windbreakers" className={`Categories-List-Item${subcategory === "Windbreakers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Windbreakers</li></NavLink>
                            </ul>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Jumpers & Cardigans</span>
                                <NavLink to={'/goods/Vests'}><li id="Vests" className={`Categories-List-Item${subcategory === "Vests" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Vests</li></NavLink>
                                <NavLink to={'/goods/Cardigans'}><li id="Cardigans" className={`Categories-List-Item${subcategory === "Cardigans" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Cardigans</li></NavLink>
                                <NavLink to={'/goods/Jumpers'}><li id="Jumpers" className={`Categories-List-Item${subcategory === "Jumpers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Jumpers</li></NavLink>
                                <NavLink to={'/goods/Sweaters'}><li id="Sweaters" className={`Categories-List-Item${subcategory === "Sweaters" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Sweaters</li></NavLink>
                            </ul>
                        </div>
                        
                    }
                    <div className='Title-Logo-And-Text'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png' className='React-Logo' />
                        <h1 className='Header-Container__Market-Title'>Myhope</h1>
                    </div>
                    
                {
                    subcategory==='all' &&
                    <div className='Header-Container__Search-Button-Container'>
                        {   this.props.searchBarState === false &&
                            <div className='Search-Button' onClick={this.createSearchBar}>
                                <span className='Search-Button__Circle'></span>
                                <span className='Search-Button__Stick'></span>
                            </div>
                        }
                        {   this.props.searchBarState === true &&
                            <React.Fragment>
                                <input type="text" placeholder="Search by name..." onChange={this.searchByName} className={`${this.props.searchBarState === false ? "Search-Bar-Hidden" : "Search-Bar-Showed" }`} />
                                <div className='Search-Button' onClick={this.closeSearchBar}>
                                    <span className={`${this.props.searchBarState === false ? "Search-Button__Circle" : "Search-Button-Cross-1"}`}></span>
                                    <span className={`${this.props.searchBarState === false ? "Search-Button__Stick" : "Search-Button-Cross-2"}`}></span>
                                </div>
                            </React.Fragment>
                            
                        }
                    </div>
                }
                

                <Cart 
                    cart = {this.props.cart} 
                    cleanCart = {this.props.cleanCart} 
                    buyModeOn = {this.props.buyModeOn}
                    cartOpened = {this.props.cartOpened}
                    openTheCart = {this.props.openTheCart}
                    cartPrice = {this.props.cartPrice}

                />

            </div>
            
        </header>
    }
}
export default Header;