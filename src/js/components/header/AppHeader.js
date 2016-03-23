import React from 'react'
import CartSummary from './AppCartSummary'

export default () =>{
  return(
    <div className="row" style={{borderBottom: '1px solid #ccc'}}>
      <div className="col-sm-2"><h2>$2 Store</h2></div>
      <div className="col-sm-10 text-right">
        <CartSummary />
      </div>
    </div>
  )
}