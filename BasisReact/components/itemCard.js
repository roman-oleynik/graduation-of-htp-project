import React from 'react';
import './itemCard.css';

class Card extends React.Component {
    render() {
        return this.props.selected === this.props.id && <div className='ProductCard'>
            <h3 className='ProductCardName'>{this.props.itemName}</h3>
            <img className='ProductCardPicture' src={this.props.pictureUrl}></img>
            <p className='ProductCardPrice'>{this.props.itemPrice + ' JQuery Symbols'}</p>
        </div>
    }
}

export default Card;