import React from 'react';

import './stylesheets/About.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class About extends React.Component {
    render() {
        return <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames='fade'
        > 
            <div className='About-Container'>
                <h1 className='About-Title'>Made with ♥ by R. Oleynik and...</h1>
                <img className='PHT-Logo' src='https://www.it-academy.by/local/images/logo.svg' />
            </div>
        </CSSTransition>
    }
}

export default About;