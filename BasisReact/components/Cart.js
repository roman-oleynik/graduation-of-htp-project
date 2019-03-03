import React from 'react';

import "./Cart.css";
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
                <img src="../img/Cart.png" className="Img-Cart" />
                <span className='Cart-Text'>Cart</span>
                <span className='Cart-Num'>{this.props.cart.length}</span>
            </div>
            {
                this.props.cartOpened === true 
                ?
                <div className='Cart__Container'>
                    {
                        this.props.cart.length === 0 ? <span>Cart is empty</span> : null
                    }
                    {
                        this.props.cart.map(el => {
                            return <CartItem
                                key = {el.key}
                                name = {el.name}
                                sendAmountData = {this.sendAmountData}
                            />
                        })
                    }
                    {
                        this.props.cart.length !== 0 ? <button onClick={this.cleanCart}>DELETE</button> : null
                    }
                    {
                        this.props.cart.length !== 0 ? <button onClick={this.buyGoods}>BUY</button> : null
                    }
                </div>
                :
                null
            }
            
        </div>
        
    }
}

export default Cart;