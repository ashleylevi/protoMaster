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

  handleState = storedCards => {
    console.log("hi");
    var storedCards = JSON.parse(localStorage.getItem("clickedCard"));
    this.setState({
      lookAtStoredCards: !this.state.lookAtStoredCards,
      storedCardIds: storedCards
    });
  };


    // let index = cardsFromStorage.indexOf(card);
    // cardsFromStorage.splice(index, 1);
    // this.setState({
    //   storedCardIds: cardsFromStorage
    // })
    //  localStorage.setItem("clickedCard", JSON.stringify(cardsFromStorage))






  render() {
    if (this.state.lookAtStoredCards === true) {
      return (
        <div className="app">
          <div className="top-right">
            <p className="account">Account</p>
            <button className="study-hub" onClick={() => this.handleState()}>
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
            <section className="cards">
              <CardContainer
                allCards={this.state.allCards}
                count={this.state.counter}
                switchQuestion={this.switchQuestion}
                checkUserAnswer={this.checkUserAnswer}
                lookAtStoredCards={this.state.lookAtStoredCards}
                storedCardIds={this.state.storedCardIds}
              />
            </section>
          </div>
        </div>
      );
    }

      // removeCard = (card) => {
  //   let cardsFromStorage = JSON.parse(localStorage.getItem("clickedCard"));
  //   let index = cardsFromStorage.indexOf(card);
  //   cardsFromStorage.splice(index, 1);
  //   this.setState({
  //     storedCardIds: cardsFromStorage
  //   })
  //    localStorage.setItem("clickedCard", JSON.stringify(cardsFromStorage))
  //  }

    return (
      <div className="app">
        <div className="top-right">
          <p className="account">Account</p>
          <button className="study-hub" onClick={() => this.handleState()}>
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
          <section className="cards">
            <CardContainer
              allCards={this.state.allCards}
              count={this.state.counter}
              switchQuestion={this.switchQuestion}
              checkUserAnswer={this.checkUserAnswer}
              lookAtStoredCards={this.state.lookAtStoredCards}
              storedCardIds={this.state.storedCardIds}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
