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
  }

  removeFeed(feedIndex) {
    this.setState((prevState) => {
      const { feedsList, } = prevState;
      return { feedsList: [...feedsList.slice(0, feedIndex), ...feedsList.slice(feedIndex + 1)] }
    })
  }
  
  componentDidMount() {
    const stateString = JSON.stringify(this.state);
    alert(stateString);
    window.localStorage.setItem('appState', stateString);
  }
  render() {
    const { feedsList, } = this.state;
    const { removeFeed, } = this;
    const appFrameProps = { feedsList, removeFeed, }
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
