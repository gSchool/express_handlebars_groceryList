import React, { Component } from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Template from './AppTemplate'
import Catalog from './catalog/AppCatalog'
import CatalogDetail from './product/AppCatalogDetail'
import Cart from './cart/AppCart'

export default () =>{
  return(
    <Router history={hashHistory}>
      <Route path="/" component={Template}>
        <IndexRoute component={Catalog}/>
        <Route path="cart" component={Cart} />
        <Route path="item/:item" component={CatalogDetail} />
      </Route>
    </Router>
  )
}
