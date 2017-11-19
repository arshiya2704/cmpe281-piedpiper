import {REHYDRATE} from 'redux-persist/constants';


export default function(state=[],action){
    switch(action.type){
        
        case "GET_CART_ITEMS":
        {
            return action.data
        }

        
        case "persist/REHYDRATE":
        {
            var incoming = action.payload.cartItems
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}