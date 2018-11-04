import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      counter: 0,
      correctAnswer: false
    }
  }

  componentDidMount = () => {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/prototypeData')
      .then(response => response.json())
      .then(allCards =>  {
        this.setState({
          allCards: allCards.prototypeData
        });
        
    })
      .catch(error => console.log(error));
    }

  displayPage = () => {
    document.querySelector('.main-card').classList.add('show');
    document.querySelector('.start-button').classList.add('hide');
  }

  switchQuestion = (event) => {
    if (this.state.counter > 28) {
    
    this.setState({
      counter: this.state.counter = 0
    })
  } else {
    this.setState({
      counter: this.state.counter+=1  
    })
  }
}
  
  checkUserAnswer = (answer) => {
    if (answer === this.state.allCards[this.state.counter].correctAnswer) {
      this.setState({
        correctAnswer: true

      })
    } else {
      console.log('incorrect')
    }


  }


  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>PROTO<span>MASTER</span></h1>
          <h2>become a <span className="pro">pro</span> at <span className="pro">proto</span>types</h2>
        </header>
        <div className="start">
          <button className="start-button" onClick={this.displayPage}>Start Studying!</button>
        </div>
        <div className="main-card">
          <section className="cards">
          <CardContainer allCards={this.state.allCards} 
                         count={this.state.counter}
                         switchQuestion={this.switchQuestion} 
                         checkUserAnswer={this.checkUserAnswer}
                         correctAnswer={this.state.correctAnswer}/>
          </section>  
        </div>
    </div>
    )
  }
}




export default App;