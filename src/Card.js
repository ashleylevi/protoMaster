import React, { Component } from 'react';
import './styles/main.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: ''
    }

  }

  selectAnswer = (e) => {
    console.log('answer', e.target.value)
    let answer = e.target.value
    this.setState({
      selectedAnswer: answer
    }) 
  }

  render() { 
    console.log(this.props)
  return (
    <div className="card-wrapper">
        <div className="question-wrapper">
          <h2>Question: {this.props.card.question}</h2>
        </div>
        <div className="answer-bank">
          <ul className="card">{
            this.props.card.answers.map((answer) => {
              return <li className="answer-choice"><input type="radio" name="answer" value={answer} onClick={e => this.selectAnswer(e)}></input>{answer}</li>
            })
          }
        </ul>
        </div>
        <div>
          <button className="submit-button" onClick={this.props.checkUserAnswer(this.state.selectedAnswer)}>Submit</button>
          <button className="next-button" onClick={this.props.switchQuestion}>Next Question</button>
        </div>  
    </div>
  );
}
}
