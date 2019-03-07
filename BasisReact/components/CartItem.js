import React from 'react'

import "./CartItem.css"

class CartItem extends React.Component {
    state = {
        count: 1,
    }
    
    incCount = () => {
        this.setState({
            count: this.state.count+1,
        })
    }
    decCount = () => {
        this.setState({
            count: this.state.count-1,
        })

    }
    render() {
        return <React.Fragment> <div className='Cart-Item'>
            <img src={this.props.url} className='Cart-Item__Picture' alt="picture" />
            <div className='TitleAndPrice'>
                <span className='Cart-Item__Title'>{this.props.name}</span>
                <span className='Cart-Item__Subcategory'>{this.props.subcategory}</span>
                <span className='Cart-Item__Price'>{`${+this.props.price * this.state.count} JQuery Symbols`}</span>
            </div>
            <div className='Cart-Item__Counter'>
                <button className='Counter__Button_Dec' disabled={this.state.count <= 1} onClick={this.decCount}>-</button>
                <span className='Counter__Num'>{this.state.count}</span>
                <button className='Counter__Button_Inc' onClick={this.incCount}>+</button>
            </div>
        </div>
        </React.Fragment>
    }
}

export default CartItem;