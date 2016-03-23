import products from '../../../assets/data/products'

const CartAPI = {
  catalog: products.data,
  cartItems: [],
  findCartItem(item){
    return this.cartItems.find(cartItem =>
      cartItem.id === item.id
    )
  },
  removeItem(item){
    return this.cartItems
      .splice(this.cartItems.findIndex(i =>
        i === item
      ),1)
  },
  addItem(item){
    const cartItem = this.findCartItem(item);
    if(!cartItem)
      this.cartItems.push(Object.assign({qty: 1}, item));
    else
      this.increaseItem(cartItem)
  },
  increaseItem(item) {return item.qty++},
  decreaseItem(item){
    return item.qty === 1
      ? this.removeItem(item)
      : item.qty--;
  },
  cartTotals(qty = 0, total = 0){
    this.cartItems.forEach(cartItem =>{
      qty   += cartItem.qty;
      total += cartItem.qty * cartItem.cost;
    });
    return {qty, total};
  },
  getCatalog(){
    return this.catalog.map(item =>{
      return Object.assign({}, item, this.cartItems.find(cItem => cItem.id === item.id))
    })
  }
};
export default CartAPI;