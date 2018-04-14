import React, { Component } from 'react';
import { HashRouter, Route, } from 'react-router-dom';
import './App.css';
import { AppFrame, } from '../AppFrame/AppFrame';

export class App extends Component {
  constructor(props) {
    super(props);
    const savedState = window.localStorage.getItem('appState');
    let feedsList = ['http://www.feedforall.com/sample-feed.xml', 'http://feeds.reuters.com/news/artsculture'];
    if (savedState) {
      feedsList = JSON.parse(savedState).feedsList;
    }
    
    this.state = {
      feedsList: feedsList,
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
    console.log(this.state)
    const { addFeed, removeFeed, } = this;
    const appFrameProps = { feedsList, addFeed, removeFeed, }
    return (
      <HashRouter>
        <Route
          path="/"
          render={() => {
            return <AppFrame { ...appFrameProps }/>
          }}
        />
      </HashRouter>
    );
  }
}
