import { dispatch, register } from '../dispatchers/app-dispatcher'
import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM
} from '../constants/app-constants'

export default{
  addItem( item ){
    dispatch({
      actionType: ADD_ITEM, item
    })
  },
  removeItem( item ){
    dispatch({
      actionType: REMOVE_ITEM, item
    })
  },
  increaseItem( item ){
    dispatch({
      actionType: INCREASE_ITEM, item
    })
  },
  decreaseItem( item ){
    dispatch({
      actionType: DECREASE_ITEM, item
    })
  }
}
