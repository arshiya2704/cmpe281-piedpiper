import React, {Component} from 'react';
import visa from '../Visa-icon.png';
import master from '../Master-Card-icon.png';
import american from '../American-Express-icon.png';


class GridList extends Component {

    render(){

        var cardStyle2={
            marginRight: '20px'
        };

        const cards= this.props.cards;
        console.log(cards);

        const cardList = cards.map((card) =>
            (card.cardType=== "Visa")?
                <li>{
                    <div>
                        <div className="col-md-1">
                            <img src={visa} className="img-responsive" alt="logo"/>
                        </div>
                        <div className="col-md-3">
                            {card.cardName}
                        </div>
                        <div className="col-md-2">
                            {card.cardNum}
                        </div>
                        <p style={cardStyle2}>{card.expDate}</p>
                        <hr/>
                    </div>}
                </li>
                :
                (card.cardType==='American Express')?
                <li>{
                    <div>
                        <div className="col-md-1">
                            <img src={american} className="img-responsive" alt="logo"/>
                        </div>
                        <div className="col-md-3">
                            {card.cardName}
                        </div>
                        <div className="col-md-2">
                            {card.cardNum}
                        </div>
                        <p style={cardStyle2}>{card.expDate}</p>
                        <hr/>
                    </div>}
                </li>:
                    <li>{
                        <div>
                            <div className="col-md-1">
                                <img src={master} className="img-responsive" alt="logo"/>
                            </div>
                            <div className="col-md-3">
                                {card.cardName}
                            </div>
                            <div className="col-md-2">
                                {card.cardNum}
                            </div>
                            <p style={cardStyle2}>{card.expDate}</p>
                            <hr/>
                        </div>}
                    </li>

        );

        {
            return(
                <div>
                    <ul>{cardList}</ul>
                </div>


            )

        }
    }


}


export default (GridList);