import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import Cart from './Cart';

import './Header.css';

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
        this.props.changeSPAMode(EO.target.id)
    }
    searchByName = (EO) => {
        this.props.searchByName(EO.target.value);
    }
    closeFilterCategoriesMode = (EO) => {
        EO.stopPropagation();
        this.props.closeFilterCategoriesMode()
    }
    render () {
        return <header className='Header-Container'>
            <div className='H-Navigation'>
                <nav className='App-Navigation'>
                    <ul className='App-Nav-Ul'>
                        <NavLink to="/" exact><li id='nav-home' className={`App-Nav-Li App-Nav-Li-Home`} onClick={this.changeSPAMode}>Home</li></NavLink>
                        <NavLink to="/goods"><li id='nav-goods' className={`App-Nav-Li App-Nav-Li-Goods`} onClick={this.changeSPAMode}>Goods</li></NavLink>
                        <NavLink to='/about'><li id='nav-about' className={`App-Nav-Li App-Nav-Li-About`} onClick={this.changeSPAMode}>About</li></NavLink>
                    </ul>
                </nav>
            </div>

            <hr className='Header-hr' />

            <div className='H-Container'>
                <div className={this.props.filterCategoriesMode === 'all' ? `Header-Container__Categories` : "Header-Container__Categories Categories-Selected"} onClick={this.switchCategoryMode}>
                    <span className='Category-Display'>{this.props.filterCategoriesMode === "all" ? "Categories" : this.props.filterCategoriesMode}</span>
                    <div className='Categories-Buttons'>
                        {
                            this.props.filterCategoriesMode !== 'all' ? <img src='../img/Cross.png' className='Categories-Cross' onClick={this.closeFilterCategoriesMode} /> : null
                        }
                        <img className={`Categories-Arrow${this.props.categoriesOpened === true ? "-Opened" : ""}`} src="../img/Arrow.png" />
                    </div>
                    
                   
                </div>
                    {
                        this.props.categoriesOpened === true && <div className='Categories-Main-Container'>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Outerwear</span>
                                <li id="Coats" className={`Categories-List-Item${this.props.filterCategoriesMode === "Coats" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Coats</li>
                                <li id="Jackets" className={`Categories-List-Item${this.props.filterCategoriesMode === "Jackets" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Jackets</li>
                                <li id="Cloaks" className={`Categories-List-Item${this.props.filterCategoriesMode === "Cloaks" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Cloaks</li>
                                <li id="Winter-jackets" className={`Categories-List-Item${this.props.filterCategoriesMode === "Winter-jackets" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Winter Jackets</li>
                                <li id="Windbreakers" className={`Categories-List-Item${this.props.filterCategoriesMode === "Windbreakers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Windbreakers</li>
                            </ul>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Jumpers & Cardigans</span>
                                <li id="Vests" className={`Categories-List-Item${this.props.filterCategoriesMode === "Vests" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Vests</li>
                                <li id="Cardigans" className={`Categories-List-Item${this.props.filterCategoriesMode === "Cardigans" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Cardigans</li>
                                <li id="Jumpers" className={`Categories-List-Item${this.props.filterCategoriesMode === "Jumpers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Jumpers</li>
                                <li id="Sweaters" className={`Categories-List-Item${this.props.filterCategoriesMode === "Sweaters" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Sweaters</li>
                            </ul>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Shoes</span>
                                <li id="Classic" className={`Categories-List-Item${this.props.filterCategoriesMode === "Classic" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Classic</li>
                                <li id="Essentials" className={`Categories-List-Item${this.props.filterCategoriesMode === "Essentials" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Essentials</li>
                                <li id="Evening" className={`Categories-List-Item${this.props.filterCategoriesMode === "Evening" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Evening</li>
                                <li id="Slippers" className={`Categories-List-Item${this.props.filterCategoriesMode === "Slippers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Slippers</li>
                            </ul>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>T-shirts & Shirts</span>
                                <li id="T-shirts" className={`Categories-List-Item${this.props.filterCategoriesMode === "T-shirts" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>T-shirts</li>
                                <li id="Polo" className={`Categories-List-Item${this.props.filterCategoriesMode === "Polo" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Polo</li>
                                <li id="Shirts" className={`Categories-List-Item${this.props.filterCategoriesMode === "Shirts" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Shirts</li>
                                <li id="Undershirts" className={`Categories-List-Item${this.props.filterCategoriesMode === "Undershirts" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Undershirts</li>
                            </ul>
                            <ul className='Categories-List Categories-List-Outerwear'>
                                <span className='Category-Title'>Pants & Jeans</span>
                                <li id="Sport" className={`Categories-List-Item${this.props.filterCategoriesMode === "Sport" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Sport</li>
                                <li id="Jeans" className={`Categories-List-Item${this.props.filterCategoriesMode === "Jeans" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Jeans</li>
                                <li id="Daily" className={`Categories-List-Item${this.props.filterCategoriesMode === "Daily" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Daily</li>
                                <li id="Warm" className={`Categories-List-Item${this.props.filterCategoriesMode === "Warm" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Warm</li>
                            </ul>
                        </div>
                        
                    }
                <h1 className='Header-Container__Market-Title'>MyShop</h1>
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

                <Cart 
                    cart = {this.props.cart} 
                    cleanCart = {this.props.cleanCart} 
                    buyModeOn = {this.props.buyModeOn}
                    cartOpened = {this.props.cartOpened}
                    openTheCart = {this.props.openTheCart}
                />

            </div>
            
        </header>
    }
}
export default Header;