import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import Cart from './Cart';

import './stylesheets/HeaderHome.css';

class HeaderHome extends React.Component {
    changeSPAMode = (EO) => {
        this.props.changeSPAMode(EO.target.id);
        this.props.closeModals();
    }
    render () {
        return <header className='Header-Container-About'>
            <div className='H-Navigation'>
                <nav className='App-Navigation'>
                    <ul className='App-Nav-Ul'>
                        <NavLink to="/" exact><li id='nav-home' className={`Home-App-Nav-Li App-Nav-Li-Home`} onClick={this.changeSPAMode}>Home</li></NavLink>
                        <NavLink to={`/goods/all`}><li id='nav-goods' className={`Home-App-Nav-Li Home-App-Nav-Li-Goods`} onClick={this.changeSPAMode}>Goods</li></NavLink>
                        <NavLink to='/about'><li id='nav-about' className={`Home-App-Nav-Li App-Nav-Li-About`} onClick={this.changeSPAMode}>About</li></NavLink>
                    </ul>
                </nav>
            </div>
        </header>
    }
}
export default HeaderHome;