import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getCartItems} from '../actions/getCartItems';

import * as API from '../api/API';

class Cart extends Component {

    getItemsCall(){
        API.getPersonalCartItems({"userId":"5"})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(data[0].items);
                    this.props.getCartItems(data[0].items);
                });
                
            }else if (res.status === 401) {
                
                console.log("Fail");
            }
        });     
    }

    componentWillMount(){
        this.getItemsCall();
    }

    removeFromCart = ( item ) => {
        API.removeFromPersonalCart({"userId":"5","itemId":item.itemId})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(data.message);
                    this.getItemsCall();
                });
                
            }else if (res.status === 401) {
                console.log("Fail");
            }
        });     
    }

    createCartItemsList(){

        console.log("in here"+ this.props.cartItems);

        
        return this.props.cartItems.map((item) => {
            return(
                <div className="row">
            
                    <li class="list-group-item clearfix">
                       <div className="row">
                           <div className="col-md-3 col-md-offset-2" style={{marginTop:"5px"}}>
                               <strong>{item.itemName}</strong>
                            
                           </div>
                           <div className="col-md-1" style={{marginTop:"5px"}}>
                                   <strong>Price:{ item.price}</strong>
                           </div>
                           <div className="col-md-1 text-right" style={{marginTop:"5px"}}>
                               <span class="badge">Quantity:{ item.quantity} </span>
                           </div>
                           <div className="col-md-1 text-right" style={{marginTop:"5px"}}>
                                   <span class="badge">Subtotal :{item.quantity*item.price}  </span>
                           </div>
                        
                           <div className="col-md-2 text-right" onClick={()=>this.removeFromCart(item)}>
                                <button className="btn btn-default"> Remove From Cart</button>
                           </div>
                       </div>
                       
                    </li>

                </div>
            )
        });
        
    }

    findTotal(){
        var total=0;
        this.props.cartItems.map(item => {
            total=total + (item.price)*(item.quantity);
        });
        
        return(
            <div className="row">
                <div className="col-md-1 col-md-offset-7 text-right" style={{marginTop:"5px"}}>
                    <span class="badge">Total :{total}  </span>
                </div>
            </div>
        )
    }

    emptyCart(){
        return(
            <div style={{"color":"red"}}><center><h3>Cart is empty</h3></center></div>
        )
    }

    render(){
        return(
            <div>
                <center><h1>Cart</h1></center>
                <br/>
                <div>
                    {this.createCartItemsList()}
                    {this.props.cartItems.length> 0 && this.findTotal()}
                    {this.props.cartItems.length== 0  && this.emptyCart()}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        cartItems:state.cartItems,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            getCartItems

        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(Cart);
