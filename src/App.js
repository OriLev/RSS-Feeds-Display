import React, { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import './App.css';
import { AppFrame, } from './components/AppFrame';

class App extends Component {
  static get defaultProps() {
    const savedState = JSON.parse(window.localStorage.getItem('appState'));
    if (!savedState) {
      return { feedsList: [], };
    }
    const { feedsList, } = savedState;
    return { feedsList, };
  }

  constructor(props) {
    super(props);
    this.state = {
      feedsList: props.feedsList,
    }

    this.removeFeed = this.removeFeed.bind(this);
    this.addFeed = this.addFeed.bind(this);
  }
  
  addFeed(feedUrl) {
    this.setState((prevState) => {
      const { feedsList, } = prevState;
      return { feedsList: [ feedUrl, ...feedsList] }
    })
  }

  removeFeed(feedIndex) {
    this.setState((prevState) => {
      const { feedsList, } = prevState;
      return { feedsList: [...feedsList.slice(0, feedIndex), ...feedsList.slice(feedIndex + 1)] }
    })
  }
  
  componentDidUpdate() {
    const stateString = JSON.stringify(this.state);
    window.localStorage.setItem('appState', stateString);
  }
  render() {
    const { feedsList, } = this.state;
    const { addFeed, removeFeed, } = this;
    const appFrameProps = { feedsList, addFeed, removeFeed, }
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            return <AppFrame { ...appFrameProps }/>
          }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
