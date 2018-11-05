import React, { Component } from 'react';
import Card from './Card.js';
import './styles/main.scss';


export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storedCards: []
    }
    
  }

  getStoredCards = (dataFromChild) => {
    this.setState({
      storedCards: dataFromChild
    })
  }

  render() { 
    if (!this.props.allCards.length) {
      return (
        <div>
          <p>Loading</p>
        </div>
        )
      } 

    if (this.props.allCards.length && this.props.lookAtStoredCards === false) {
     return (
        <div className="cardcontainer-wrapper">
          <div>
            <Card card={this.props.allCards[this.props.count]}
                  switchQuestion={this.props.switchQuestion}
                  checkUserAnswer={this.props.checkUserAnswer}
                  getStoredCards={this.getStoredCards} /> 
        </div>   
      </div>
    );
  }

    if (this.props.lookAtStoredCards === true) {
      return (
        <ul>
          <li>
            {
              this.props.storedCardIds.map((id) => {
                return this.props.allCards.filter((card) => {
                  return card.id === id
                })
              }).reduce((arr, question) => arr.concat(question), []).map(card => {
                return <Card  card={card} 
                              key={card.id}
                              switchQuestion={this.props.switchQuestion}
                              checkUserAnswer={this.props.checkUserAnswer}
                              getStoredCards={this.getStoredCards}
                              lookAtStoredCards={this.props.lookAtStoredCards} /> 
              })
                
            }
          </li>
        </ul>
      )
        
    }
    }
  }




