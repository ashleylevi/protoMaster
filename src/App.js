import React, { Component } from "react";
import "./App.css";
import CardContainer from "./CardContainer.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      counter: 0,
      lookAtStoredCards: false,
      storedCardIds: []
    };
  }

  componentDidMount = () => {
    fetch("http://memoize-datasets.herokuapp.com/api/v1/prototypeData")
      .then(response => response.json())
      .then(allCards => {
        this.setState({
          allCards: allCards.prototypeData
        });
      })
      .catch(error => console.log(error));
  };

  displayPage = () => {
    document.querySelector(".main-card").classList.add("show");
    document.querySelector(".start-button").classList.add("hide");
  };


  switchQuestion = event => {
    if (this.state.counter > 28) {
      this.setState({
        counter: (this.state.counter = 0)
      });
    } else {
      this.setState({
        counter: (this.state.counter += 1)
      });
    }
  };

  storeCard = storedCards => {
    console.log("hi");
    var storedCards = JSON.parse(localStorage.getItem("clickedCard"));
    this.setState({
      lookAtStoredCards: !this.state.lookAtStoredCards,
      storedCardIds: storedCards
    });
  };

  removeCardFromPage = array => {
    this.setState({
      storedCardIds: array
    });
  };

  render() {
    let numberOfStudyCards = (
      <a className="plus" data-tooltip="Add this question to your study hub!">
        <i class="fas fa-plus" onClick={() => this.storeCard(this.props.card.id)}/>
      </a>
    );
    

    if (this.state.lookAtStoredCards === true) {
      return (
        <div className="app">
          <div className="top-right">
            <button className="study-hub" onClick={() => this.storeCard()}>
              HOME
            </button>
          </div>
          <header className="app-header">
            <h1>
              PROTO
              <span>MASTER</span>
            </h1>
            <h2>
              become a <span className="pro">pro</span> at{" "}
              <span className="pro">proto</span>
              types
            </h2>
          </header>
          <div className="start">
            <button className="start-button" onClick={this.displayPage}>
              Start Studying!
            </button>
          </div>
          <div className="main-card">
          <p className="study-hub-title">MY STUDY QUESTIONS: <span className="num">{this.state.storedCardIds.length}</span></p>
            <CardContainer
              allCards={this.state.allCards}
              count={this.state.counter}
              switchQuestion={this.switchQuestion}
              checkUserAnswer={this.checkUserAnswer}
              lookAtStoredCards={this.state.lookAtStoredCards}
              storedCardIds={this.state.storedCardIds}
              removeCardFromPage={this.removeCardFromPage}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="top-right">
          <button className="study-hub" onClick={() => this.storeCard()}>
            My Study Hub
          </button>
        </div>
        <header className="app-header">
          <h1>
            PROTO
            <span>MASTER</span>
          </h1>
          <h2>
            become a <span className="pro">pro</span> at{" "}
            <span className="pro">proto</span>
            types
          </h2>
        </header>
        <div className="start">
          <button className="start-button" onClick={this.displayPage}>
            Start Studying!
          </button>
        </div>
        <div className="main-card">
        <p className="study-hub-title">QUESTION: <span className="num">{this.state.counter + 1}</span> of <span className="num">30</span></p>
          <CardContainer
            allCards={this.state.allCards}
            count={this.state.counter}
            switchQuestion={this.switchQuestion}
            checkUserAnswer={this.checkUserAnswer}
            lookAtStoredCards={this.state.lookAtStoredCards}
            storedCardIds={this.state.storedCardIds}
          />
        </div>
      </div>
    );
  }
}

export default App;
