import React from 'react';

class Product extends React.Component {
   prodMark = () => {
      this.props.markItem(this.props.id);

   }
   prodEdit = (EO) => {
      EO.stopPropagation();
      this.props.editItem(this.props.id, this.props.arrayIndex);
      
   }
   prodDel = (EO) => {
      EO.stopPropagation();
      this.props.deleteItem(this.props.id);
   }
   render() {
      return <tr className={`TableItem${this.props.appMode === 1 && this.props.selected === this.props.id ? " selected" : this.props.appMode === 3 && this.props.selected === this.props.id ? " selected" : null}`} id={this.props.id} onClick={this.prodMark}>
                  <td className='TableItemName'>{this.props.itemName}</td>
                  <td className='TableItemPrice'>{this.props.itemPrice}</td>
                  <td className='TableItemPicture'>
                     <img src={this.props.pictureUrl}></img>
                  </td>
                  <td className='TableItemLeft'>{this.props.itemLeft}</td>
                  <td className='TableItemEdit'>
                     <button className='TableItemEditButton' onClick={this.prodEdit}>Edit</button>
                  </td>
                  <td className='TableItemDelete'>
                     <button className='TableItemDeleteButton' onClick={this.prodDel}>Delete</button>
                  </td>
             </tr>
   }
}

export default Product;
