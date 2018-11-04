import React, { Component } from 'react';
import Card from './Card.js';
import './styles/main.scss';


export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    
  }

  render() { 
    console.log(this.props)
    if (!this.props.allCards.length) {
      return (
        <div>
          <p>Loading</p>
        </div>
        )
      } else {
  
    return (
     <div className="cardcontainer-wrapper">
        <div>

            <Card card={this.props.allCards[this.props.count]}
                  switchQuestion={this.props.switchQuestion}
                  checkUserAnswer={this.props.checkUserAnswer}
                  getStoredCards={this.props.getStoredCards} /> 
          
        
        </div>   
      </div>
    );
  }
}
}
