import React from 'react';
import './newGood.css';

class Form extends React.Component {
    validateField = (EO) => {
        this.props.validateField(EO.target);
    };

    submitData = () => {
        this.props.submitData();
    };

    canselForm = () => {
        this.props.canselForm();
    };

    render() {
        return <div className="NewGoodFormContainer">
                <div className='NewGoodForm'>
                        <div className='FormField FormFieldName'>
                            <input type='text' name='nameFieldValid' placeholder='Name' className='nameFieldValue' defaultValue={this.props.nameFieldValue} onChange={this.validateField}></input>
                            <div className='FormFieldNameMessage'>{this.props.nameFieldValid ? "" : "Please, fill in this field"}</div>
                        </div>
                        <div className='FormField FormFieldName'>
                            <input type='text' name='priceFieldValid' placeholder='Price' className='priceFieldValue' defaultValue={this.props.priceFieldValue} onChange={this.validateField}></input>
                            <div className='FormFieldNameMessage'>{this.props.priceFieldValid ? "" : "Please, fill in this field"}</div>
                        </div>
                        <div className='FormField FormFieldName'>
                            <input type='text' name='urlFieldValid' placeholder='pictureURL' className='urlFieldValue' defaultValue={this.props.urlFieldValue} onChange={this.validateField}></input>
                            <div className='FormFieldNameMessage'>{this.props.urlFieldValid ? "" : "Please, fill in this field"}</div>
                        </div>
                        <div className='FormField FormFieldName'>
                            <input type='text' name='leftFieldValid' placeholder='Left' className='leftFieldValue' defaultValue={this.props.leftFieldValue} onChange={this.validateField}></input>
                            <div className='FormFieldNameMessage'>{this.props.leftFieldValid ? "" : "Please, fill in this field"}</div>
                        </div>
                        <button className='SubmitButton' disabled={(this.props.nameFieldValid && this.props.priceFieldValid &&
                this.props.urlFieldValid && this.props.leftFieldValid) ? false : true} onClick={this.submitData}>Submit</button>
                        <button className='CancelButton' onClick={this.canselForm}>Cansel</button>
                </div>
        </div> 
        
       
    }
}

export default Form;