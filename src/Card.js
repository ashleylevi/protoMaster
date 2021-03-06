import React, { Component } from "react";
import "./styles/main.scss";
import PropTypes from "prop-types";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: "",
      clickedSubmit: false,
      correctAnswer: null
    };
  }

  selectAnswer = (e) => {
    let answer = e.target.value;
    this.setState({
      selectedAnswer: answer
    });
  };

  checkUserAnswer = (answer) => {
    if (answer === this.props.card.correctAnswer) {
      this.setState({
        correctAnswer: true
      });
    }
  };

  submitAnswer = () => {
    this.checkUserAnswer(this.state.selectedAnswer);
    this.setState({
      clickedSubmit: true
    });
  };

  resetState = () => {
    this.props.switchQuestion();
    this.setState({
      clickedSubmit: false,
      submitAnswer: "",
      correctAnswer: null
    });
  };

  skipQuestion = () => {
    this.props.switchQuestion();
  };

  storeCard = (card) => {
    this.handleWiggle();
    let storedCards = [];
    if (
      JSON.parse(localStorage.getItem("clickedCard")) &&
      !JSON.parse(localStorage.getItem("clickedCard")).includes(card)
    ) {
      storedCards = JSON.parse(localStorage.getItem("clickedCard"));
      storedCards.push(card);
      localStorage.setItem("clickedCard", JSON.stringify(storedCards));
    } else {
      storedCards.push(card);
      localStorage.setItem("clickedCard", JSON.stringify(storedCards));
    }
  };

  removeCard = card => {
    let cardsFromStorage = JSON.parse(localStorage.getItem("clickedCard"));
    for (let i = 0; i < cardsFromStorage.length; i++) {
      if (cardsFromStorage[i] === card) {
        delete cardsFromStorage[i];
      }
    }

    let nullFreeArray = cardsFromStorage.filter(id => {
      return id !== null;
    });

    localStorage.setItem("clickedCard", JSON.stringify(nullFreeArray));
    this.props.removeCardFromPage(nullFreeArray);
  };

  handleWiggle = () => {
    window.clearTimeout();
    this.toggleWiggle();
    setTimeout(this.toggleWiggle, 500);
  };

  toggleWiggle = () => {
    document.querySelector(".card-wrapper").classList.toggle("moving");
  };

  render() {
    let showResult = this.state.correctAnswer ? "CORRECT!" : "INCORRECT!";

    let plusMinusButton = (
      <a className="plus" data-tooltip="Add this question to your study hub!">
        <i
          class="fas fa-plus"
          onClick={() => this.storeCard(this.props.card.id)}
        />
      </a>
    );

    let skipQuestionButton = (
      <button className="next-button" onClick={this.resetState}>
        {" "}
        Skip Question
      </button>
    );

    let nextQuestionButton = (
      <button className="next-button" onClick={this.resetState}>
        Next Question
      </button>
    );

    if (this.props.lookAtStoredCards === true) {
      plusMinusButton = (
        <a
          className="minus"
          data-tooltip="Remove this question from your study hub!"
        >
          <i
            class="fas fa-minus"
            onClick={() => this.removeCard(this.props.card.id)}
          />
        </a>
      );

      skipQuestionButton = "";
      nextQuestionButton = "";
    }

    if (this.state.clickedSubmit === false) {
      return (
        <div className="card-wrapper">
          <div className="question-wrapper">
            <h3>Question: {this.props.card.question}</h3>
          </div>
          <div className="answer-bank">
            <ul className="card">
              {this.props.card.answers.map(answer => {
                return (
                  <li className="answer-choice">
                    <input
                      type="radio"
                      name="answer"
                      className="form-radio"
                      label="form"
                      value={answer}
                      onClick={this.selectAnswer}
                    />
                    {answer}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="user-feedback">
            {this.state.clickedSubmit && <p>{showResult}</p>}
          </div>
          <div className="card-buttons">
            <button className="submit-button" onClick={this.submitAnswer}>
              Submit
            </button>
            {skipQuestionButton}
          </div>
        </div>
      );
    }

    if (this.state.clickedSubmit === true) {
      return (
        <div className="card-wrapper">
          {plusMinusButton}
          <div className="question-wrapper">
            <h3>Question: {this.props.card.question}</h3>
          </div>
          <div className="user-feedback">
            {this.state.clickedSubmit && (
              <p className="show-result">{showResult}</p>
            )}
          </div>
          <div>{nextQuestionButton}</div>
        </div>
      );
    }
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
  switchQuestion: PropTypes.func.isRequired,
  checkUserAnswer: PropTypes.func.isRequired,
  lookAtStoredCards: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  removeCardFromPage: PropTypes.func.isRequired
};
