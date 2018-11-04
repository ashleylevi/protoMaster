import React, { Component } from 'react';
import './styles/main.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: '',
      clickedSubmit: false,
      correctAnswer: null
    }

  }

  selectAnswer = (e) => {
    let answer = e.target.value
    this.setState({
      selectedAnswer: answer
    }) 
  }

  checkUserAnswer = (answer) => {
    if (answer === this.props.card.correctAnswer) {
      this.setState({
        correctAnswer: true
      })
    } 
  }

  submitAnswer = () => {
    this.checkUserAnswer(this.state.selectedAnswer)
    this.setState({
      clickedSubmit: true
    })
  }

  resetState = () => {
    this.props.switchQuestion()
    this.setState({
      clickedSubmit: false,
      submitAnswer: '',
      correctAnswer: null
    }) 
  }

  storeCard = (card) => {
    console.log('clicked card:', card)
    let storedCards = []
    if (JSON.parse(localStorage.getItem('clickedCard'))) {
      storedCards = JSON.parse(localStorage.getItem('clickedCard'))
      storedCards.push(card)
      localStorage.setItem('clickedCard', JSON.stringify(storedCards))
    } else {
      storedCards.push(card)
      localStorage.setItem('clickedCard', JSON.stringify(storedCards))
    }
  }

  render() { 
    const showResult = this.state.correctAnswer
      ? 'Correct!' 
      : 'Incorrect!'

    if (this.state.clickedSubmit === false) {
      return (
        <div className="card-wrapper">
          <i class="fas fa-plus" onClick={this.storeCard(this.props.card)}></i>
          <div className="question-wrapper">
            <h3>Question: {this.props.card.question}</h3>
          </div>
          <div className="answer-bank">
            <ul className="card">{
              this.props.card.answers.map((answer) => {
                return <li className="answer-choice"><input type="radio" name="answer" className="form-radio" label="form" value={answer} onClick={this.selectAnswer}></input>{answer}</li>
                })
              }
            </ul>
          </div>
          <div className="user-feedback">
            {
              this.state.clickedSubmit &&
              <p>{showResult}</p>
            }
          </div>
          <div className="card-buttons">
            <button className="submit-button" onClick={this.submitAnswer}>Submit</button>
          </div>  
        </div>
      );
    }

  if (this.state.clickedSubmit === true) {
    return (
      <div className="card-wrapper">
        <i class="fas fa-plus" onClick={this.storeCard}></i>
      <div className="question-wrapper">
        <h3>Question: {this.props.card.question}</h3>
      </div>
      <div className="user-feedback">
        {
          this.state.clickedSubmit &&
           <p className="show-result">{showResult}</p>
        }
      </div>
      <div>
        <button className="next-button" onClick={this.resetState}>Next Question</button>
      </div> 
    </div>
    )
  }
  }
  }