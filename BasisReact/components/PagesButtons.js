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
        let {routedSubcategory} = this.props;
        let filteredProducts = this.props.products.filter (el => el.subcategory === routedSubcategory || routedSubcategory === 'all');
        return <div className="PagesButtonsBlock">
            {   
                this.props.filterMode === false && routedSubcategory !== 'all'
                ?
                filteredProducts.map((el,i) => {
                    return i % 50 === 0 ? <NavLink to={`/goods/${this.props.routedSubcategory}`} key={i/10+1}><span className={`${i/50+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`} key={i/50+1} id={i/50+1} onClick={this.goToPage}>{i/50+1}</span></NavLink> : null
                })
                :
                this.props.filterMode === true
                ?
                this.props.filteredProducts.map((el,i) => {
                    return i % 50 === 0 ? <NavLink to={`/goods/${this.props.routedSubcategory}`} key={i/10+1}><span className={`${i/50+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`}  id={i/50+1} onClick={this.goToPage}>{i/50+1}</span></NavLink> : null
                })
                :
                this.props.products.map((el,i) => {
                    return i % 50 === 0 ? <NavLink to={`/goods/${this.props.routedSubcategory}`} key={i/10+1}><span className={`${i/50+1 === this.props.page ? "PageButton-Selected" : "PageButton"}`}  id={i/50+1} onClick={this.goToPage}>{i/50+1}</span></NavLink> : null
                })
            }
            
        </div>
    }
}

export default PagesButtons;