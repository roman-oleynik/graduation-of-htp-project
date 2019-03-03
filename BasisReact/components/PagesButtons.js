import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import "./PagesButtons.css";

class PagesButtons extends React.Component {
    goToPage = (EO) => {
        // console.log(+EO.target.id)
        this.props.goToPage(+EO.target.id)
    }
    goToPageLeft = () => {
        this.props.goToPageLeft();
    }
    goToPageRight = () => {
        this.props.goToPageRight();
    }
    render() {
        return <div className="PagesButtonsBlock">
            <button className='Pages-Buttons-Arrow-Left' disabled={this.props.page === 1} onClick={this.goToPageLeft}>{'<'}</button>
            {   
                this.props.filterMode === true 
                ?
                this.props.filteredProducts.map((el,i) => {
                    return i % 10 === 0 ? <span className={`${i/10+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`} key={i/10+1} id={i/10+1} onClick={this.goToPage}>{i/10+1}</span> : null
                })
                :
                this.props.products.map((el,i) => {
                    return i % 10 === 0 ? <span className={`${i/10+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`} key={i/10+1} id={i/10+1} onClick={this.goToPage}>{i/10+1}</span> : null
                })
            }
            <button className='Pages-Buttons-Arrow-Right' disabled={(this.props.page === Math.ceil(this.props.products.length/10) && this.props.filterMode === false) || (this.props.page === Math.ceil(this.props.filteredProducts.length/10) && this.props.filterMode === true)} onClick={this.goToPageRight}>></button>
            
        </div>
    }
}

export default PagesButtons;