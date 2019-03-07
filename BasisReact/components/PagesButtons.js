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
            {/* <NavLink to={`/goods/${this.props.routedSubcategory}`}><button className='Pages-Buttons-Arrow-Left' disabled={this.props.page === 1} onClick={this.goToPageLeft}>{'<'}</button></NavLink> */}
            {   
                this.props.filterMode === true || this.props.routedSubcategory !== 'all' 
                ?
                this.props.filteredProducts.map((el,i) => {
                    return i % 50 === 0 ? <NavLink to={`/goods/${this.props.routedSubcategory}`} key={i/10+1}><span className={`${i/50+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`} key={i/50+1} id={i/50+1} onClick={this.goToPage}>{i/50+1}</span></NavLink> : null
                })
                :
                this.props.products.map((el,i) => {
                    return i % 50 === 0 ? <NavLink to={`/goods/${this.props.routedSubcategory}`} key={i/10+1}><span className={`${i/50+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`}  id={i/50+1} onClick={this.goToPage}>{i/50+1}</span></NavLink> : null
                })
            }
            {/* <NavLink to={`/goods/${this.props.routedSubcategory}`}><button className='Pages-Buttons-Arrow-Right' disabled={(this.props.page === Math.ceil(this.props.products.length/50) && this.props.filterMode === false) || (this.props.page === Math.ceil(this.props.filteredProducts.length/50) && this.props.filterMode === true)} onClick={this.goToPageRight}>></button></NavLink> */}
            
        </div>
    }
}

export default PagesButtons;