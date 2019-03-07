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
                <svg className="Img-Cart" xmlns='http://www.w3.org/2000/svg' width='446.9' height='420.6' viewBox='0 0 446.9 420.6'
                overflow='scroll'>
                    <path className='st0' d='M444.3,80.2c-2.6-3.7-6.7-5.9-11.1-6.1L155.9,62.1c-8-0.3-14.6,5.8-14.9,13.7c-0.3,7.9,5.8,14.6,13.7,14.9 l258.4,11.1l-50.8,158.5H136.2L95.4,38c-0.9-4.9-4.2-8.9-8.9-10.8L19.6,1C12.2-1.9,3.9,1.7,1,9.1c-2.9,7.4,0.7,15.7,8.1,18.6 l59.5,23.4l41.6,226.3c1.3,6.8,7.2,11.7,14.1,11.7h6.9l-15.7,43.7c-1.3,3.7-0.8,7.7,1.5,10.9c2.2,3.2,5.9,5.1,9.8,5.1h11 c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43s43-19.3,43-43c0-11-4.2-21.1-11-28.7h93.8c-6.8,7.6-11,17.6-11,28.7 c0,23.7,19.3,43,43,43c23.7,0,43-19.3,43-43c0-11-4.2-21.1-11-28.7h13.4c6.6,0,11.9-5.3,11.9-11.9c0-6.6-5.3-11.9-11.9-11.9H143.7 l12.9-35.8h216.2c6.2,0,11.8-4,13.7-10l59.7-186.4C447.5,88.5,446.8,83.9,444.3,80.2z M169.7,396.7c-10.5,0-19.1-8.6-19.1-19.1 s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S180.2,396.7,169.7,396.7z M327.4,396.7c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1 s19.1,8.6,19.1,19.1S337.9,396.7,327.4,396.7z'
                    />
                </svg>

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