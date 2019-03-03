import React from 'react';

import './BuyModeForm.css';

class BuyModeForm extends React.Component {
    state = {
        formName: "",
        formPhone: "",
        formEmail: "",
    }
    closeBuyForm = () => {
        this.props.buyModeOff();
    }
    submitData = () => {
        this.props.submitData();
        this.props.buyModeOff();
    }
    changeInputValue = (EO) => {
        this.setState({
            [EO.target.id]: EO.target.value
        });
    }
    render() {
        return <div className='Modal-Form-Container'>
            <img src='../img/Cross.png' className='Close-Modal-Form-Container' onClick={this.closeBuyForm} />
            <h3 className='Form-Title'>Fill in the form</h3>
            <div className='Buy-Form-Labels'>
                <label className='Buy-Label'>Name
                    <input id='formName' type='text' className='Buy-Input Name-Input' onChange={this.changeInputValue} />
                </label>
                <label className='Buy-Label'>Phone number
                    <input id='formPhone' type='text' className='Buy-Input Number-Phone-Input' onChange={this.changeInputValue} />
                </label>
                <label className='Buy-Label'>E-mail
                    <input id='formEmail' type='text' className='Buy-Input Email-Input' onChange={this.changeInputValue} />
                </label>
                <button className='Submit-Data' disabled={this.state.formName === "" || this.state.formPhone === "" || this.state.formEmail === ""} onClick={this.submitData}>Submit</button>
            </div>
            
        </div>
    }
}

export default BuyModeForm;