import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import "./PagesButtons.css";

class PagesButtons extends React.Component {
    goToPage = (EO) => {
        // console.log(+EO.target.id)
        this.props.goToPage(+EO.target.id)
    }
    render() {
        return <div className="PagesButtonsBlock">
            {
                this.props.products.map((el,i) => {
                    return i % 10 === 0 ? <span className={`${"PageButton"}`} key={i/10+1} id={i/10+1} onClick={this.goToPage}>{i/10+1}</span> : null
                })
            }
            
        </div>
    }
}

export default PagesButtons;