import {combineReducers} from 'redux';
import cartItems from './getCartItemsReducer';

const allReducers = combineReducers({
    cartItems,

 });
 
 export default allReducers;