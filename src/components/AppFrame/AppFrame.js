import React from 'react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RSSInputForm, } from '../RSSInputForm/RSSInputForm';
import { RSSFeedsList, } from '../RSSFeedsList/RSSFeedsList';
import { RSSFeed, } from '../RSSFeed/RSSFeed';
import { ErrorMessage, } from '../ErrorMessage/ErrorMessage';
import './AppFrame.css';

function SideBar({ feedsList, addFeed, removeFeed, }) {
  const RSSInputFormWithHistory = withRouter(RSSInputForm);
  return (
    <div className="sidebar">
      <div className="sidebar__RSSInputContainer">
         <RSSInputFormWithHistory addFeed={ addFeed }/>
      </div>
      <div className="sidebar__RSSListContainer">
        <RSSFeedsList feedsList={ feedsList } removeFeed={ removeFeed }/>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  feedsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addFeed: PropTypes.func.isRequired,
  removeFeed: PropTypes.func.isRequired,
}

function MainScreen({ activeFeed }) {
  return (
    <React.Fragment>
      <div className="main__headerContainer">
        <h1> { activeFeed } </h1>
      </div>
      <div className="main__feedContainer">
        <RSSFeed activeFeed={ activeFeed }/>
      </div>
    </React.Fragment>
  );
}

MainScreen.propTypes = {
  activeFeed: PropTypes.string.isRequired,
}

export function AppFrame({ feedsList, addFeed, removeFeed, }) {
  console.log(feedsList)
  const sidebarProps = { feedsList, addFeed, removeFeed, }
  return (
    <div className="appWrapper">
      <SideBar { ...sidebarProps } />
      <div className="main">
        <Switch>
          {feedsList.map((RSSFeedURL) => (
            <Route 
              key={RSSFeedURL} 
              exact
              path={`/${RSSFeedURL}`} 
              render={() => <MainScreen activeFeed={RSSFeedURL} /> } 
            />
          ))}
          <Route path="/:illegalRoute" render={() => (
            <ErrorMessage message={ 'There is no feed associataed with this route' } />
          )} />
        </Switch>
      </div>
    </div>
  );  
}

AppFrame.propTypes = {
  feedsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addFeed: PropTypes.func.isRequired,
  removeFeed: PropTypes.func.isRequired,
}