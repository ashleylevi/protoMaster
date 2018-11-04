import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      counter: 0

  
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
      console.log('correct')
    } else {
      console.log('incorrect')
    }


  }


  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>PROTOMASTER</h1>
          <h2>become a pro at prototypes</h2>
        </header>
        <section className="cards">
        <CardContainer allCards={this.state.allCards} 
                       count={this.state.counter}
                       switchQuestion={this.switchQuestion} 
                       checkUserAnswer={this.checkUserAnswer}/>
        </section>
      </div>
    )
  }
}




export default App;
