import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom';
import { ItemsList, } from '../ItemsList/ItemsList';
import './RSSFeedsList.css';

function RSSFeedLink({ feedURL, removeFeed, }) {
  return (
    <div className="feedLinkBox">
      <NavLink to={`/${feedURL}`} className="feedLinkBox__NavLink" activeClassName="feedLinkBox__NavLink--active">
        { feedURL }
      </NavLink>
      <span className="feedLinkBox__removeLinkButton" onClick={ removeFeed }>
        <i className="fas fa-times"></i>
      </span>
    </div>
  )
}

RSSFeedLink.propTypes = {
  feedURL: PropTypes.string.isRequired,
  removeFeed: PropTypes.func.isRequired,
}


export function RSSFeedsList({ feedsList, removeFeed, }) {
  const FeedLinks = feedsList.map((feedURL, index) => (
    <RSSFeedLink feedURL={ feedURL } removeFeed={ () => removeFeed(index) } />
  ))
  return (
    <ItemsList type="oneSize" items={ FeedLinks } keys = { feedsList } />
  );
}

RSSFeedsList.propTypes = {
  feedsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFeed: PropTypes.func.isRequired,
}