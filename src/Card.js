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

  resetState = () => {
    this.props.switchQuestion()
    this.setState({
      clickedSubmit: false,
      submitAnswer: '',
      correctAnswer: null
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
    // document.querySelector('.answer-bank').classList.add('hide')
    // document.querySelector('.submit-button').classList.add('hide')
    // document.querySelector('.next-button').classList.add('show')
    // document.querySelector('.show').classList.remove('next-button')
    this.setState({
      clickedSubmit: true
    })
  }

  render() { 

    const showResult = this.state.correctAnswer
      ? 'Correct!' 
      : 'Incorrect!'
if (this.state.clickedSubmit === false) {
  return (
    <div className="card-wrapper">
      <i class="fas fa-plus"></i>
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
          <button className="next-button" onClick={this.resetState}>Next Question</button>
        </div>  
    </div>
  );
}

  if (this.state.clickedSubmit === true) {
    return(
    <div className="user-feedback">
          {
            this.state.clickedSubmit &&
            <p>{showResult}</p>
          }
         </div>
)
  }

  
}
}