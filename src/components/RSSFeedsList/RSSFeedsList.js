import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom'
import './RSSFeedsList.css';

function RSSFeedLink({ feedURL, removeFeed, }) {
  return (
    <li className="feedsList__container">
      <NavLink to={`/${feedURL}`} className="link" activeClassName="link--active">
        {feedURL}
      </NavLink>
      <span className="removeLinkButton" onClick={ removeFeed }>
        <i className="fas fa-times"></i>
      </span> 
    </li>
  )
}

RSSFeedLink.propTypes = {
  feedURL: PropTypes.string.isRequired,
  removeFeed: PropTypes.func.isRequired,
}

export function RSSFeedsList({ feedsList, removeFeed, }) {
  return (
    <ul className="feedsList">
      {feedsList.map((feedURL, index) => (
        <RSSFeedLink key={ feedURL } feedURL={ feedURL } removeFeed={ () => removeFeed(index) } />
      ))}
    </ul>
  );
}

RSSFeedsList.propTypes = {
  feedsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFeed: PropTypes.func.isRequired,
}