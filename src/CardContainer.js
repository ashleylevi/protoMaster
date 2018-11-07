import React, { Component } from "react";
import Card from "./Card.js";
import "./styles/main.scss";
import PropTypes from "prop-types";

export default function CardContainer(props) {

    if (!props.allCards.length) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    if (props.allCards.length && props.lookAtStoredCards === false) {
      return (
        <div className="cardcontainer-wrapper">
          <div>
            <Card
              card={props.allCards[props.count]}
              switchQuestion={props.switchQuestion}
              checkUserAnswer={props.checkUserAnswer}
              lookAtStoredCards={props.lookAtStoredCards}
              removeCard={props.removeCard}
              removeCardFromPage={props.removeCardFromPage}
            />
          </div>
        </div>
      );
    }

    if (props.lookAtStoredCards === true && props.storedCardIds) {
      return (
        <div>
          <div className="stored-cards">
            {props.storedCardIds
              .map(id => {
                return props.allCards.filter(card => {
                  return card.id === id;
                });
              })
              .reduce((arr, question) => arr.concat(question), [])
              .map(card => {
                return (
                  <Card
                    card={card}
                    key={card.id}
                    switchQuestion={props.switchQuestion}
                    checkUserAnswer={props.checkUserAnswer}
                    lookAtStoredCards={props.lookAtStoredCards}
                    removeCard={props.removeCard}
                    removeCardFromPage={props.removeCardFromPage}
                  />
                );
              })}
          </div>
        </div>
      );
    }
}

CardContainer.propTypes = {
  allCards: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  switchQuestion: PropTypes.func.isRequired,
  checkUserAnswer: PropTypes.func.isRequired,
  lookAtStoredCards: PropTypes.func.isRequired,
  storedCardIds: PropTypes.array.isRequired
};
