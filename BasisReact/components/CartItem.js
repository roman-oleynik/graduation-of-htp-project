import React from 'react'

import "./CartItem.css"

class CartItem extends React.Component {
    state = {
        count: 1,
    }
    // sendAmountData = () => {
    //     this.props.sendAmountData(this.state.count, this.props.name)
    // }
    incCount = () => {
        this.setState({
            count: this.state.count+1,
        })
        // this.sendAmountData();
    }
    decCount = () => {
        this.setState({
            count: this.state.count-1,
        })
        // this.sendAmountData();
    }
    render() {
        return <div className='Cart-Item'>
            <h1 className='Cart-Item__Title'>{this.props.name}</h1>
            <div className='Cart-Item__Counter'>
                <button className='Counter__Button_Dec' disabled={this.state.count <= 1} onClick={this.decCount}>-</button>
                <span className='Counter__Num'>{this.state.count}</span>
                <button className='Counter__Button_Inc' onClick={this.incCount}>+</button>
            </div>
        </div>
    }
}

export default CartItem;