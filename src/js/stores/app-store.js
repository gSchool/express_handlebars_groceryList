import { dispatch, register } from '../dispatchers/app-dispatcher'
import { EventEmitter } from 'events'
import CartAPI from '../api/CartAPI'
import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  CHANGE_EVENT
} from '../constants/app-constants'

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange(){
    this.emit( CHANGE_EVENT )
  },
  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  getCart(){
    return CartAPI.cartItems;
  },
  getCatalog(){
    return CartAPI.getCatalog();
  },
  getCartTotals(){
    return CartAPI.cartTotals();
  },
  dispatcherIndex: register(function(action){
    switch(action.actionType){
      case ADD_ITEM:
        CartAPI.addItem(action.item);
        break;
      case REMOVE_ITEM:
        CartAPI.removeItem(action.item);
        break;
      case INCREASE_ITEM:
        CartAPI.increaseItem(action.item);
        break;
      case DECREASE_ITEM:
        CartAPI.decreaseItem(action.item);
        break;
      default:
        return;
    }
    AppStore.emitChange()
  })
});
export default AppStore
