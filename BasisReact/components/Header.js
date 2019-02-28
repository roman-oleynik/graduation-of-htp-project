import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import './Header.css';

class Header extends React.Component {
    state = {
        searchBarState: 'no-ready',
        categoriesOpened: false,
    };
    switchCategoryMode = (EO) => {
        this.state.categoriesOpened === false ?
        this.setState({
            categoriesOpened: true
        })
        :
        this.setState({
            categoriesOpened: false
        })
    };
    createSearchBar = () => {
        this.state.searchBarState === 'no-ready' ?
        this.setState({
            searchBarState: 'ready',
        })
        : 
        this.setState({
            searchBarState: 'no-ready',
        })
    };
    searchInputValue = "";
    changeSearchInputValue = (EO) => {
        this.searchInputValue = EO.target.value;
    }
    searchByName = () => {
        this.props.searchByName(this.searchInputValue);
    }
    filterByCategory = (EO) => {
        this.props.switchFilterCategoriesMode(EO.target.id);
    };
    changeSPAMode = (EO) => {
        this.props.changeSPAMode(EO.target.id)
    }
    render () {
        return <header className='Header-Container'>
            <div className='H-Navigation'>
                <nav className='App-Navigation'>
                    <ul className='App-Nav-Ul'>
                        <li id='nav-home' className='App-Nav-Li App-Nav-Li-Home' onClick={this.changeSPAMode}>Home</li>
                        <li id='nav-goods' className='App-Nav-Li App-Nav-Li-Goods' onClick={this.changeSPAMode}>Goods</li>
                        <li id='nav-about' className='App-Nav-Li App-Nav-Li-About' onClick={this.changeSPAMode}>About</li>
                    </ul>
                </nav>
            </div>

            <hr className='Header-hr' />

            <div className='H-Container'>
                <div className={`Header-Container__Categories`} onClick={this.switchCategoryMode}>Categories
                    <img className={`Categories-Arrow${this.state.categoriesOpened === true ? "-Opened" : ""}`} src="../img/Arrow.png" />
                </div>
                    {
                        this.state.categoriesOpened === true && <ul className='Categories-List'>
                            <li id="all" className={`Categories-List-Item${this.props.filterCategoriesMode === "all" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>All</li>
                            <hr className='Categories-hr' />    
                            <li id="computers" className={`Categories-List-Item${this.props.filterCategoriesMode === "computers" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Computers</li>
                            <hr className='Categories-hr' /> 
                            <li id="phones" className={`Categories-List-Item${this.props.filterCategoriesMode === "phones" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Phones</li>
                            <hr className='Categories-hr' /> 
                            <li id="tablets" className={`Categories-List-Item${this.props.filterCategoriesMode === "tablets" ? "-Blocked" : ""}`} onClick={this.filterByCategory}>Tablets</li>
                        </ul>
                    }
                <h1 className='Header-Container__Market-Title'>MyShop</h1>
                <div className='Header-Container__Search-Button-Container'>
                    {   
                        this.state.searchBarState === 'no-ready' &&
                        <div className='Search-Button' onClick={this.createSearchBar}>
                            <span className={`Search-Button__Circle`}></span>
                            <span className={`Search-Button__Stick`}></span>
                        </div>
                    }
                    {   
                        this.state.searchBarState === 'ready' &&
                        <React.Fragment>
                            <input type="text" placeholder="Search by name..." onChange={this.changeSearchInputValue} className={`Search-Bar-Showed`} />
                            <div className='Search-Button' onClick={this.searchByName}>
                                <span className={`Search-Button__Circle`}></span>
                                <span className={`Search-Button__Stick`}></span>
                            </div>
                        </React.Fragment>
                    }
                </div>
                <div className='Header-Container__Cart'>
                    <img src="../img/Cart.png" className="Img-Cart" />
                    <span className='Cart-Text'>Cart</span>
                    <span className='Cart-Num'>0</span>
                </div>
            </div>
            
        </header>
    }
}
export default Header;