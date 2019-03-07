import React from 'react';
import './itemCard.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


class Card extends React.Component {
    state = {
        cardAppearStatus: true,
        buttonClosePressed: false,
    }
    closeItemCard = () => {
        this.setState({
            buttonClosePressed: true,
            cardAppearStatus: false,
        });
    }
    componentWillReceiveProps = () => {
        this.state.buttonClosePressed === true && this.setState({cardAppearStatus: true, buttonClosePressed: false})
    }
    render() {
        let selectedProduct = this.props.products.find(el=>el.id === this.props.selected);
        return selectedProduct !== undefined && <CSSTransition
                in={this.state.cardAppearStatus}
                appear={true}
                timeout={400}
                classNames='trans'
        >
            <div className='ProductCard'>
                <button className='ProductCardCloseButton' onClick={this.closeItemCard}>
                    <div className='Search-Button'>
                        <span className='Search-Button-Cross-1'></span>
                        <span className='Search-Button-Cross-2'></span>
                    </div>
                </button>
                <h3 className='ProductCardName'>{selectedProduct.name}</h3>
                <img className='ProductCardPicture' src={selectedProduct.url}></img>
                <p className='ProductCardPrice'><strong className='ProductCardPrice'>{selectedProduct.price}</strong> {' JQuery Symbols'}</p>
                <span className='ProductCardDescription'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quos nisi possimus? Neque esse doloremque alias recusandae cupiditate dicta est cumque, libero voluptates velit vero laudantium quae accusantium porro, minima, modi quo natus enim. Possimus, tempora libero temporibus inventore ipsam ipsa blanditiis porro consequatur nesciunt tempore, soluta laudantium nisi culpa molestiae dolorem natus eveniet ut deleniti impedit rem?</span>
            </div>
        </CSSTransition>
    }
}

export default Card;