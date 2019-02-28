import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import "./goods.css";

class Product extends React.Component {
   prodMark = () => {
      this.props.markItem(this.props.id);

   }
   // prodEdit = (EO) => {
   //    EO.stopPropagation();
   //    this.props.editItem(this.props.id, this.props.arrayIndex);
      
   // }
   // prodDel = (EO) => {
   //    EO.stopPropagation();
   //    this.props.deleteItem(this.props.id);
   // }
   render() {
      return this.props.page === this.props.prodPage+1 && <div className={`TableItem ${this.props.appMode === 1 && this.props.selected === this.props.id ? "selected" : this.props.appMode === 3 && this.props.selected === this.props.id ? " selected" : null}`} id={this.props.id} onMouseOver={this.prodMark}>
                  <h3 className={`TableItemName ${this.props.appMode === 1 && this.props.selected === this.props.id ? "selTitle" : this.props.appMode === 3 && this.props.selected === this.props.id ? " selTitle" : null}`}>{this.props.itemName}</h3>
                  <div className='TableItemPrice'>{this.props.itemPrice} JQuery Symbols</div>
                  <div className='TableItemPicture'>
                     <img className="ProductImage" src={this.props.pictureUrl}></img>
                  </div>
                  <div className='TableItemLeft'>Left: {this.props.itemLeft}</div>
                  <div className="EditDeleteButtonsBlock">
                     {/* <div className='TableItemEdit'>
                        <button className='TableItemEditButton' onClick={this.prodEdit}>Edit</button>
                     </div>
                     <div className='TableItemDelete'>
                        <button className='TableItemDeleteButton' onClick={this.prodDel}>Delete</button>
                     </div> */}
                     <div className='TableItemAddToCart'>
                        <button className='TableItemAddToCartButton' onClick={this.prodAddToCart}>Add to Cart</button>
                     </div>
                  </div>
                  
             </div>
   }
}


export default Product;
