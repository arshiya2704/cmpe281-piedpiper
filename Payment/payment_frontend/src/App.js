import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api/API';

import Select from 'react-select';

class App extends Component {

    constructor() {
        super();
        this.state = {
            cardNum:'',
            cardName:'',
            expM:'1',
            expY:'2017'
        };

    }

    saveCard = () =>{
        const payload = {};
        payload.cardNum= this.state.cardNum;
        payload.cardName= this.state.cardName;
        var str1= payload.cardNum;
        var str= str1.slice(0,2);
        if (str === '34' || str === '37'){
            payload.cardType = 'American Express'
        }
        else if (str === '51' || str === '52' || str === '53' || str === '54' || str === '55'){
            payload.cardType = 'Mastercard'
        }
        else if (str === '40' || str === '41' || str === '42' || str === '43' || str === '44' || str === '45' || str === '46' || str === '47' || str === '48' || str === '49' ){
            payload.cardType = 'Visa'
        }
        payload.expM=this.state.expM;
        payload.expY=this.state.expY;
        API.save(payload).then((res) => {
            if (res.status === 200) {
                console.log("saved");
            }
            else{
                console.log("not saved");
            }
        });

    };

    handleChange (propertyName, event) {
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
    }

  render() {
      var droStyle={
        width: "80px"
      };
    return (
        <div className="container-fluid">
            <div className="row">
                <br/><br/><br/>
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal">Add Card</button>
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Enter details</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form">
                                        <div className="form-group">
                                            Card Number:
                                            <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'cardNum')} value={this.state.cardNum}></input><br/>
                                            Name on Card:
                                            <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'cardName')} value={this.state.cardName}></input><br/>
                                            <div>
                                            Exp Date:<br/>
                                                MM / YYYY
                                                <br/>
                                                <div className= "col-md-2">
                                                    <select id="month" onChange={this.handleChange.bind(this, 'expM')} value={this.state.expM}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select>
                                                    <p></p>
                                                </div>
                                                <div className= "col-md-2">
                                                    <select id="month" onChange={this.handleChange.bind(this, 'expY')} value={this.state.expY}>
                                                        <option value="2017">2017</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2023">2024</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2028">2028</option>
                                                    </select>
                                                    <p></p>
                                                </div>
                                                <br/>
                                                <br/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.saveCard()}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
