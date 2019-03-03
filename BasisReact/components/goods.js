import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import "./goods.css";

class Product extends React.Component {
   
   prodMark = () => {
      this.props.markItem(this.props.id);

   }
   
   
   prodAddToCart = (EO) => {
      this.props.prodAddToCart(this.props.id);
   }
   render() {
      return this.props.page === this.props.prodPage+1 && <div className={`TableItem ${this.props.selected === this.props.id ? "selected" : this.props.appMode === 3 && this.props.selected === this.props.id ? " selected" : null}`} id={this.props.id} onClick={this.prodMark}>
                  <h3 className={`TableItemName ${this.props.selected === this.props.id ? "selTitle" : this.props.appMode === 3 && this.props.selected === this.props.id ? " selTitle" : null}`}>{this.props.itemName}</h3>
                  <div className='TableItemPrice'>{this.props.itemPrice} JQuery Symbols</div>
                  <div className='TableItemPicture'>
                     <img className="ProductImage" src={this.props.pictureUrl}></img>
                  </div>
                  <div className='TableItemLeft'>Left: {this.props.itemLeft}</div>
                  <div className="EditDeleteButtonsBlock">
                     <div className='TableItemAddToCart'>
                        <button className='TableItemAddToCartButton' onClick={this.prodAddToCart}>Add to Cart</button>
                     </div>
                  </div>

                  
             </div>
   }
}


export default Product;
