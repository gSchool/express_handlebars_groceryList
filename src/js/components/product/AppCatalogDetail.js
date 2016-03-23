import React, { Component } from 'react'
import { Link } from 'react-router'
import StoreWatchMixin from '../../mixins/StoreWatchMixin'
import AppStore from '../../stores/app-store'
import AppActions from '../../actions/app-actions'
import CartButton from '../cart/AppCartButton'

function getCatalogItem(props){
  let item = AppStore.getCatalog().find( ({id}) => id === props.params.item);
  return {item}
}
const CatalogDetail = (props) =>{
  let itemStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: 15
  };
  return(
    <div style={itemStyle}>
      <h4>{props.item.title}</h4>
      <img src={props.item.image_path} />
      <p>{props.item.description}</p>
      <p>${props.item.cost}
        <span className="text-success">
          {props.item.qty && ` - (${props.item.qty} in cart)`}
        </span>
      </p>
      <div className="input-group">
        <Link to="/" className="btn btn-default btn-sm">
          Continue Shopping
        </Link>
        <CartButton
          handler={AppActions.addItem.bind(null, props.item)}
          txt="Add To Cart" />
      </div>
    </div>
  )
};

export default StoreWatchMixin(CatalogDetail, getCatalogItem)