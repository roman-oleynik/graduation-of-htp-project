import React from 'react';

import "./stylesheets/Cart.css";
import CartItem from './CartItem';

class Cart extends React.Component {
    cleanCart = () => {
        this.props.cleanCart();
    }
    buyGoods = () => {
        this.props.buyModeOn();
    }
    openTheCart = () => {
        this.props.openTheCart();
    }
    
    render() {    
        return <div className='Header-Container__Cart'>
            <div className={`Cart__Icon ${this.props.cartOpened === true ? 'Cart__Icon_Bordered' : null}`} onClick={this.openTheCart}>
                <span className='Cart-Text'>Cart</span>
                <span className='Cart-Num'>{this.props.cart.length}</span>
            </div>
            {
                this.props.cartOpened === true 
                ?
                <div className='Cart__Container'>
                    <div className='Cart-Items'>
                    {
                        this.props.cart.map((el,i) => {
                            return <CartItem
                                cart = {this.props.cart}
                                key = {el.key}
                                id = {el.id}
                                name = {el.name}
                                url = {el.url}
                                price = {el.price}
                                order = {i}
                                subcategory = {el.subcategory}
                            />
                        })
                    } 
                    </div>
                    {
                        this.props.cart.length === 0 
                        ?
                        <span>Cart is empty</span> 
                        : 
                        null
                    }
                    {
                        this.props.cart.length !== 0 ? <button className='CleanTheCart' onClick={this.cleanCart}>Clean</button> : null
                    }
                    {/* {
                        this.props.cart.length !== 0 ? <button onClick={this.buyGoods}>BUY</button> : null
                    } */}
                </div>
                :
                null
            }
            
        </div>
        
    }
}

export default Cart;