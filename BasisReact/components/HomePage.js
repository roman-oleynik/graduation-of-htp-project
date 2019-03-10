import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './stylesheets/HomePage.css'

import {TransitionGroup, CSSTransition} from 'react-transition-group';


class HomePage extends React.Component {
    render() {
        return <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames='fade'
        >
            <section className='HomePage-Section'>
                <div className='HomePage-Container'>
                    <h1 className='HomePage__Title'>It's high time</h1>
                    <p className='HomePage__Subtitle'>to buy something...</p>
                    <NavLink to='/goods/all'><button className='HomePage__GetStarted'>Now!</button></NavLink>
                </div>
            </section>
        </CSSTransition>    

    }
}

export default HomePage;